const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const { time } = require('console');


// Схемы моделей данных
const User = require('./models/User');
const Good = require('./models/Good');
const Costumer = require('./models/Costumer')


// Присойдинение к базе данных
mongoose.connect('mongodb+srv://crm_admin:123123123@cluster0.nutsf.mongodb.net/crm-internet-shop?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

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
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'email in use'
            })
        }
        return res.status(200).json({
            title: 'register in sucsess'
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
        if(!user) return res.status(401).json({
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
                title: 'user grabbed',
                user
            })
        })
    })
})


// ---------------- API ---------------- \\


// Добавить заказ
app.post("/api/addGood", (req, res, next) =>{
    // Поиск пользователя по API ключе
    User.findOne({"userInfo.api_key": req.body.API_KEY}, (err, user)=>{
        if(!user) return res.status(401).json({
            title:'user_not_found',
            error: err
        })
        const user_id=user._id; // Сохраняем id юзера
        //Ищем по номеру телефона клиента в базе
        Costumer.findOne({"phone":req.body.good.phone}, (err,costumer)=>{
            if(err){
                return res.status(500).json({
                    title:'server_error',
                    error: err.message
                })
            }           
            // Создаем новый объект с заказом
            const newGood = new Good({
                user_id:user_id,
                order_date: req.body.good.order_date,
                costs:req.body.good.costs,
                article_goods:req.body.good.article_goods,
                count:req.body.good.count,
                status:[
                    {status_now:"placed_order", changes_date:req.body.good.order_date, comnt:"-"}],    
                delivery:req.body.good.delivery,
                comment:req.body.good.comment
            })
            const goodId = newGood._id
            // Отправляет заказ в базу
            newGood.save(err =>{
                if(err){
                    return res.status(500).json({
                        title: 'server_error',
                        error: err.message
                    })
                }
            })
          // Если клиента с таким номером не существует создаем нового
          if(!costumer){
              console.log("costumer is not defined")

            // Создаем новый объект с клиентом
            const newCostumer = new Costumer({
                user_id:user_id,
                bio:req.body.good.bio,
                phone:req.body.good.phone,
                email:req.body.good.email,
                orders:[{order_id:goodId, address:req.body.good.address, order_bio:req.body.good.bio}]
            })
            // Отправляем в базу
            newCostumer.save(err =>{
                if(err){
                    return res.status(500).json({
                        title: 'server_error',
                        error: err.message
                    })
                }
            })
          } 
          else{
              console.log("costumer is")

            // Если клиент есть с таким номером телефона. Тогда обновляем список заказов данного клиента
            costumer.updateOne({$push: {'orders' :{order_id:goodId, address: req.body.good.address, order_bio: req.body.good.bio}}}, (err)=>{
                if(err){
                    return res.status(500).json({
                        title:'server_error',
                        error: err.message
                    })
                }
            })
          }            
        })
        if(err){
            return res.status(500).json({
                title:'server_error',
                error: err.message
            })
        }
        return res.status(200).json({
            title:"good_add_in_succses"
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