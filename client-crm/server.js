const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const User = require('./models/User')


mongoose.connect('mongodb+srv://crm_admin:123123123@cluster0.nutsf.mongodb.net/crm-internet-shop?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.post('/register', (req, res, next) =>{
    const newUser =new User({
        email : req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password,10)
    })
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

app.post('/login', (req, res, next) =>{
    User.findOne({email : req.body.email}, (err,user)=>{
        if(err) return res.status(500).json({
            title:'server error',
            error: err
        })
        if(!user) return res.status(401).json({
            title:'user not found',
            error: 'invalid credentials'
        })

        if(!bcrypt.compareSync(req.body.password, user.password)){
          return res.status(401).json({
              title:'login failed',
              error:'invalid credentials'
          })
        }
        const token =jwt.sign({userId : user._id}, '1337');
        return res.status(200).json({
            title:'login sucsess',
            token
        })
    })
})

app.get('/user', (req, res, next) =>{
    const token = req.headers.token;
    jwt.verify(token, '1337', (err, decoded) =>{
        if(err) return res.status(401).json({
            title: 'unauthorized'
        })
        User.findOne( {_id: decoded.userId}, (err, user)=> {
            if(err) return console.log(err)
            console.log(user)
        })
    })
})

const port = process.env.PORT || 5000;

app.listen(port, (err)=>{
    if(err) return console.log(err);
    console.log('server running on port '+port);
})