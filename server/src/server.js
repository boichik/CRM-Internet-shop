const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const dotevn = require('dotenv');
const { time } = require('console');


// Схемы моделей данных
const User = require('../models/User');
const Order = require('../models/Order');
const Costumer = require('../models/Costumer');
const Good = require('../models/Good');
const Report = require('../models/Report');



const { result } = require('lodash');
const { userInfo } = require('os');

dotevn.config();
// Присойдинение к базе данных
mongoose.connect(`mongodb+srv://${process.env.VAR_DB}@cluster0.nutsf.mongodb.net/crm-internet-shop?retryWrites=true&w=majority`,
                 { useNewUrlParser: true, useUnifiedTopology: true },
                  (err)=>{
                            if(err){
                                console.log('ERROR_DB: '+err)
                            }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// ------------- Роуты ------------ \\


// Регестрация
app.post('/register', (req, res, next) =>{

    // Генерируем значение для API
    const crypto = require("crypto");
    const id = crypto.randomBytes(20).toString('hex');
    User.findOne({"userInfo.email" : req.body.email}, (err,user)=>{
        if(err) throw err
        if(!user){
            // Создаем новый объект с пользователем
            const newUser =new User({
                userInfo:{
                    email : req.body.email,
                    name: req.body.name,
                    api_key:id     
                },
                password: bcrypt.hashSync(req.body.password,10)
            })
            // Отправляем данные на базу
            newUser.save(err =>{
                if(err) res.status(500).json({
                    title:'server_error'
                })
            })


        }else{
            return res.status(409).json({
                title: 'email_in_use'
            })
        }
        return res.status(200).json({
            title: 'register_sucsess'
        })
    })


})

// Вход в систему
app.post('/login', (req, res, next) =>{
    // Ищем пользователя с таким же емейлом
    User.findOne({"userInfo.email" : req.body.email}, (err,user)=>{
        // Серверная ошибка
        if(err) return res.status(500).json({
            title:'server error',
            error: err
        })
        // Пользователя не найдено
        if(!user) return res.status(404).json({
            title:'user not found',
            error: 'invalid credentials'
        })
        // Не правильный пароль
        if(!bcrypt.compareSync(req.body.password, user.password)){
          return res.status(401).json({
              title:'login failed',
              error:'invalid credentials'
          })
        }
        // Успешный вход
        const token =jwt.sign({userId : user._id}, '1337');
        return res.status(200).json({
            title:'login sucsess',
            token
        })
    })
})

// Получить данные о пользователе
app.get('/user', (req, res, next) =>{
    // Получаем текущий токен
    const token = req.headers.token;
    // Верификация токена
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized'
        })
        // Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            if(err) return console.log(err)
            return res.status(200).json({
                title: 'user_grabbed',
                user
            })
        })
    })
})

// Изменить имя пользователя
app.post('/user/name', (req,res,next)=>{
    const token = req.body.token;
    //Верификация токена
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized',
            error: err
        })
        // Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            if(err) return console.log(err)
            if(!user) return res.status(404).json({
                title:'user_not_found'
            })
        })
        .updateOne({'userInfo.name' : req.body.data.fio})
        
    })
})

// Изменить пароль пользователя
app.post('/user/password', (req, res, next)=>{
    const token = req.body.token;
    const new_pass = bcrypt.hashSync(req.body.data.new_password,10)
    //Верификация токена
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized',
            error: err
        })
        // Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            if(err) return console.log(err)
            if(!user) return res.status(404).json({
                title:'user_not_found'
            })
            if(!bcrypt.compareSync(req.body.data.password, user.password)){
                return res.status(409).json({
                    title:'wrong_pass'
                })
            }
            user.updateOne({'password' : new_pass}, (err)=>{
                if(err) throw err
                else return res.status(200).json({
                    title:'update_pass_succses'
                })
            })
        })
    })

})

// Обновить отчет
app.post('/reports/update', (req, res, next)=>{
    const token = req.body.token;
    //Верификация токена
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized',
            error: err
        })
        //Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            if(err) return console.log(err)
            if(!user) return res.status(404).json({
                title:'user_not_found'
            })
            userID = user._id
            Report.find({user_id: userID}, (err, reports)=>{
                if(err) throw err
                if(!reports){
                    return res.status(404).json({
                        title: 'reports_not_found'
                    })
                }
                else{
                    reportID = null
                    for(var i=1;i<reports.length;i++){
                        if(reports[i].report_date.slice(0,7)=== req.body.formData.report_date.slice(0,7)){
                             reportID = reports[i]._id
                        }
                    }
                    Report.findOne({_id: reportID}, (err, report)=>{
                        if(err) throw err
                        if(!report) return res.status(404).json({
                            title: 'report_not_fount'
                        })

                    }).updateMany({user_id: userID, report_date: req.body.formData.report_date, income: req.body.formData.income, possible: req.body.formData.possible, allOrders: req.body.formData.allOrders})
                } 
                
            })
            
            // const newReport = new Report({
            //     user_id: decoded.userId,
            //     report_date: req.body.formData.report_date,
            //     income: req.body.formData.income,
            //     possible: req.body.formData.possible,
            //     allOrders: req.body.formData.allOrders
            // })            
            // // Отправляем в базу
            // newReport.save(err =>{
            //     if(err) throw err
            // })
            

        })
        //.updateOne({'userInfo.lastReport' : req.body.formData.report_date})
    })
})

// Востановление пароля
app.post('/recovery', (req, res, next)=>{
    const crypto = require("crypto");
    const pass = crypto.randomBytes(10).toString('hex');
    const crypPass = bcrypt.hashSync(pass,10)
    User.findOne({"userInfo.email" : req.body.email}, (err,user)=>{
        if(err) throw err
        if(!user) return res.status(404).json({
            title:'user_not_found'
        })      
    })
    .updateOne({'password' : crypPass})   
    let transporter = nodemailer.createTransport({
        service: 'gmail',
            auth: {
                user: process.env.VAR_EMAIL,
                pass: process.env.VAR_PASS
            }
        });
    transporter.sendMail({
      from: '"BOYKO-CRM SYSTEM" <nodejs@example.com>',
      to: req.body.email,
      subject: "Востановление пароля",
      text: "Востановление пароля",
      html: `<body style="background: linear-gradient(90deg, rgba(2,0,36,1) 40%, rgba(255,0,39,1) 100%); margin: 0;padding: 0; font-family: 'Montserrat', sans-serif;">
             <div style="width: 70%; margin: 200px auto;height: 400px;background: rgba(255, 255, 255, 0.2);text-align: center;color: white;">
             <h3 style="margin: 0;padding-top: 20px;">BOYKO-CRM SYSTEM</h3>
            <p>Вы только что запросили востановление пароля! Ваш новый пароль <span style="background: black;">${pass}</span>.</p>
            <p>Спасибо что пользуетесь услугами BOYKO-CRM SYSTEM</p>
                                                            </div>
            </body>`
    });

    return res.status(200).json({
        title:'succses'
    })
})

// Добавить новый отчет
app.post('/reports', (req, res, next)=>{
    const token = req.body.token;
    //Верификация токена
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized',
            error: err
        })
        //Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            if(err) return console.log(err)
            if(!user) return res.status(404).json({
                title:'user_not_found'
            })
            userID = user._id
            const newReport = new Report({
                user_id: decoded.userId,
                report_date: req.body.formData.report_date,
                income: req.body.formData.income,
                possible: req.body.formData.possible,
                allOrders: req.body.formData.allOrders
            })            
            // Отправляем в базу
            newReport.save(err =>{
                if(err) throw err
            })
            

        })
        .updateOne({'userInfo.lastReport' : req.body.formData.report_date})
    })
})

// Получить все отчеты
app.get('/reports', (req, res, next)=>{
    const token = req.headers.token;
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized'
        })
        // Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            if(err) throw err

            Report.find({user_id: user._id}, (err, reports)=>{
                if(err) return res.status(500).json({
                    title:"server_error",
                    error:err.message
                })
                if(!reports){
                   return res.status(404).json({
                       title:"reports_not_found"
                   })
                }
                return res.status(200).json({
                    title: 'reports_granned',
                    reports
                })
                
            })
            
        })
    })
})

// Получить все заказы
app.get('/orders', (req, res, next)=>{
    const token = req.headers.token;
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized'
        })
        // Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            if(err) return console.log(err)
            userID=user._id
            Order.find({user_id: userID}, (err, orders)=>{
                if(err) return res.status(500).json({
                    title:"server_error",
                    error:err.message
                })
                if(!orders){
                   return res.status(404).json({
                       title:"orders_not_found"
                   })
                }
                return res.status(200).json({
                    title: 'orders_granned',
                    orders
                })
                
            })
            
        })
    })
})

// Получить все товары
app.get('/goods', (req, res, next)=>{
    const token = req.headers.token;
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized'
        })
        // Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            if(err) return console.log(err)
            Good.find({user_id: user._id}, (err, goods)=>{
                if(err) return res.status(500).json({
                    title:"server_error",
                    error:err.message
                })
                if(!goods){
                   return res.status(404).json({
                       title:"goods_not_found"
                   })
                }
                return res.status(200).json({
                    title: 'goods_granned',
                    goods
                })
                
            })
            
        })
    })

})
// Получить всех клиентов
app.get('/costumers', (req, res, next)=>{
    const token = req.headers.token;
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized'
        })
        // Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            if(err) return console.log(err)
            userID=user._id
            Costumer.find({user_id: userID}, (err, costumers)=>{
                if(err) return res.status(500).json({
                    title:"server_error",
                    error:err.message
                })
                if(!costumers){
                   return res.status(404).json({
                       title:"costumers_not_found"
                   })
                }
                return res.status(200).json({
                    title: 'costumers_granned',
                    costumers
                })

                
            })
            
        })
    })
})

// Получить заказ по ид
app.get('/orders/:id', (req, res, next)=>{
    const token = req.headers.token;
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized'
        })
 
        // Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            if(err) return console.log(err)
            userID=user._id
            Order.findOne({'order_id': req.params.id}, (err, order)=>{
                if(err) return res.status(500).json({
                    title:"server_error",
                    error:err
                })
                if(!order){
                   return res.status(404).json({
                       title:"orders_not_found"
                   })
                }
                
                return res.status(200).json({
                    title: 'order_granned',
                    order
                })
                
            })
            
        })
    })
})

// Получить товар по ид
app.get('/goods/:id', (req, res, next)=>{
    const token = req.headers.token;
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized'
        })
 
        // Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            if(err) return console.log(err)
            Good.findOne({'good_id': req.params.id}, (err, good)=>{
                if(err) return res.status(500).json({
                    title:"server_error",
                    error:err
                })
                if(!good){
                   return res.status(404).json({
                       title:"good_not_found"
                   })
                }
                
                return res.status(200).json({
                    title: 'good_granned',
                    good
                })
                
            })
            
        })
    })
})

// Обновить данные о товаре по ид
app.post('/goods/:id', (req, res, next)=>{
    const token = req.body.token;
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) throw err
        if(!decoded) return res.status(500).json({
            title:'server_error'
        })
        //Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            
            if(err) throw err;

            if(!user) return res.status(404).json({
                title:'user_not_found'
            })
            
            Good.findOne({ $or :[ { quantity: { 'user_id': user._id } }, { 'good_id': req.params.id } ]}, (err, good)=>{
                if(err) throw err;
                if(!good) return res.status(404).json({
                       title:"orders_not_found"
                   })
                })                 
                .updateMany({good_id:req.params.id, user_id: user._id, manufacturer: req.body.dataForm.manufacturer, name: req.body.dataForm.name,
                    price: req.body.dataForm.price, article: req.body.dataForm.article, count: req.body.dataForm.count }, (err)=>{
                    if(err) throw err  
                })

                return res.status(200).json({
                    title:'succses'
                })  
        })
    })
})

// Получить клиента по ид
app.get('/costumers/:id', (req, res, next)=>{

    const token = req.headers.token;
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized'
        })
 
        // Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            if(err) return console.log(err)
            userID=user._id
            Costumer.findOne({'costumer_id': req.params.id}, (err, costumer)=>{
                if(err) return res.status(500).json({
                    title:"server_error",
                    error:err.message
                })
                if(!costumer){
                   return res.status(404).json({
                       title:"costumer_not_found"
                   })
                }
                
                return res.status(200).json({
                    title: 'costumer_granned',
                    costumer
                })
                
            })
            
        })
    })
})

// Обновить статус заказа по ид
app.post('/orders/:id', (req,res,next)=>{
    
   const token = req.body.token;
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized',
            message: err
        })
        if(!decoded) return res.status(500).json({
            title:'server_error'
        })
        //Ищием пользователя по id и получаем информацию о нем
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            
            if(err) return console.log(err)
            userID=user._id
            Order
                .findOne({ $or :[ { quantity: { 'user_id': userID } }, { 'order_id': req.params.id } ]}, (err, order)=>{
                if(err) return res.status(500).json({
                    title:"server_error",
                    error:err
                })
                if(!order) return res.status(404).json({
                       title:"orders_not_found"
                   })})                 
                .updateMany({$addToSet : {'status' :{status_now:req.body.formStatus.status_now, changes_date: req.body.formStatus.changes_date, comnt: req.body.formStatus.comnt}}}, (err)=>{
                    if(err){
                        return res.status(500).json({
                            title:'server_error',
                            error: err.message
                        })
                    }
                    return res.status(200).json({
                        title:'succses'
                    })       
                })
               

        })
    })
})


// ---------------- API ---------------- \\
function CreateOrder(oID, uID, cID, oDate, COST, Article, COUNT, DELIVERY,COMMENT){
    const newOrder = new Order({
        order_id: oID,
        user_id:uID,
        costumer_id:cID,
        order_date: oDate,
        costs: COST,
        article_good: Article,
        count: COUNT,
        status:[
            {status_now:"placed_order", changes_date: oDate, comnt: COMMENT}],    
        delivery: DELIVERY,
        comment: COMMENT
    })
    // Отправляет заказ в базу
    newOrder.save(err =>{
        if(err){
            return err
        }
    })
}

// Добавить заказ
app.post("/api/addOrder", (req, res, next) =>{

    // Поиск пользователя по API ключе
    User.findOne({"userInfo.api_key": req.body.API_KEY}, (err, user)=>{
        if(!user) return res.status(401).json({
            title:'user_not_found',
            error: err
        })
        var CountOrders = 0
        var CostumerID = ''

        // Поиск всех заказов по id юзера
        Order.find({user_id: user._id}, (err,orders)=>{
            
            if(err) return res.status(500).json({
                title:'server_error',
                error: err.message
            })
            if(orders.length==0){
                CountOrders = 1 
            }
            CountOrders= orders.length+1
        

            //Ищем по номеру телефона клиента в базе
            Costumer.findOne({"phone":req.body.order.phone}, (err,costumer)=>{
                if(err){
                    return res.status(500).json({
                        title:'server_error',
                        error: err.message
                    })
                }
                // Если клиента с таким номером не существует создаем нового
                if(!costumer){
                    console.log('!costumer')
                    Costumer.find({user_id:user._id},(err,allCost)=>{

                        if(err){
                            return  res.status(500)
                        }
                        
                        if(allCost.length==0){
                            CostumerID = 1
                        }

                        if(allCost.length>0){
                            CostumerID = allCost.length + 1
                        }  
                        CreateOrder(CountOrders, user._id, CostumerID, req.body.order.order_date, req.body.order.costs, req.body.order.article_good, req.body.order.count, req.body.order.delivery, req.body.order.comment)
                        const newCostumer = new Costumer({
                            user_id: user._id,
                            costumer_id: CostumerID,
                            bio: req.body.order.bio,
                            phone: req.body.order.phone,
                            email: req.body.order.email,
                            orders:[
                                {order_id: CountOrders, address: req.body.order.address, order_bio: req.body.order.bio}
                            ]
                        })            
                        // Отправляем в базу
                        newCostumer.save(err =>{
                            if(err) return 'error'
                        })
                    })
                }
                else{
                    console.log('costumer')
                    CreateOrder(CountOrders, user._id, costumer.costumer_id, req.body.order.order_date, req.body.order.costs, req.body.order.article_good, req.body.order.count, req.body.order.delivery, req.body.order.comment)
                    Costumer.findOne({phone: req.body.order.phone}, (err)=>{if(err) return console.log(err)}).updateOne({$addToSet: {orders:{order_id: CountOrders, address: req.body.order.address, order_bio: req.body.order.bio}}}, (err)=>{
                        if(err) return err 
                    })          
                }
            })
        })
        
        if(err){
            return res.status(500).json({
                title:'server_error',
                error: err.message
            })
        }
        return res.status(200).json({
            title:"order_add_in_succses"
        }) 
        
    })
})
// Добавить товар
app.post("/api/addGood", (req, res, next)=>{
    console.log(req.body)
    User.findOne({"userInfo.api_key": req.body.API_KEY}, (err, user)=>{
        if(err) return res.status(500).json({
            title:'server_error',
            error: err
        })
        if(!user) return res.status(401).json({
            title:'user_not_found',
            error: err
        })
        var CountGoods = 0
        Good.find({'user_id':user._id}, (err, goods)=>{
             if(err) return res.status(500).json({
                 title:'server_error',
                 error:err
             })
             if(!goods){
                 CountGoods = 1
             }
             CountGoods= goods.length + 1
             
             const newGood = new Good({
                good_id: CountGoods,
                user_id: user._id,
                manufacturer:req.body.good.manufacturer,
                name: req.body.good.name,
                price: req.body.good.price,
                article: req.body.good.article,
                count: req.body.good.count
             })

             newGood.save(err=>{
                 if(err) return res.status(500).json({
                     title:'not_save_server_error',
                     error: err
                 })
             })
            
        })
        return res.status(201).json({
            title:'good_add_sucsses'
        })
        
        // const newCostumer = new Costumer({
        //     user_id: user._id,
        //     costumer_id: CostumerID,
        //     bio: req.body.order.bio,
        //     phone: req.body.order.phone,
        //     email: req.body.order.email,
        //     orders:[
        //         {order_id: CountOrders, address: req.body.order.address, order_bio: req.body.order.bio}
        //     ]
        // })            
        // // Отправляем в базу
        // newCostumer.save(err =>{
        //     if(err) return 'error'
        // })

    })
})
// Получить все заказы
app.get("/api/getOrders", (req,res,next) =>{
    console.log(req.headers.api)
    User.findOne({"userInfo.api_key": req.headers.api}, (err, user)=>{
        if(!user) return res.status(401).json({
            title:'user_not_found',
            error: err
        })
        Order.find({'user_id': user._id}, (err,orders)=>{
            if(err) return res.status(500).json({
                title:'server_error',
                error: err
            })
            if(!orders) return res.status(404).json({
                title:'orders_not_found'
            })
            return res.status(200).json({
                title:'orders_granned_succses',
                orders
            })
        })

    })
})

app.post('/api/report', (req, res, next)=>{
    User.findOne({"userInfo.api_key": req.body.API_KEY}, (err, user)=>{
        if(err) throw err
        if(!user) return res.status(401).json({
            title:'user_not_found',
            error: err
        })
    Order.find({order_date:{$gt: req.body.formData2.selectData, $lt: req.body.formData2.endData}}, (err,orders)=>{
        if(err) throw err
        if(!orders) return console.log('!orders')
        return res.status(200).json({
            title:'succses',
            orders
        })
    })

    })
})

// Задаем порт
const port = process.env.PORT || 5000;


// Прослушка порта
app.listen(port, (err)=>{
    if(err) return console.log(err);
    console.log('server running on port '+port);
})