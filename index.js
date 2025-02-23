const express = require('express');
let jwt = require('jsonwebtoken');
let app = express();
let  cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const path = require('path');
app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(express.static('views'))
const ejs = require('ejs');
app.set('view engine', 'ejs')

let  giveAccese = require('./middleware/acces.js');


let users = [
    {
        id: 1,
        name: 'gautam',
        email: 'butola@gmail.com',
        password : 123456,
        imgUrl : 'https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0',
    }
]

app.use(cookieParser());


app.get('/', giveAccese ,(req , res) => {
        try {
            let  user = req.users; 
            if(!user){
                res.redirect('/login')  
            }
            
           return res.render('homepage' , {user});
        } catch (error) {
            return res.json({ error : 'error' , message : 'error' })
        }
})

app.get('/login' , (req , res) => {
    res.sendFile(path.join(__dirname , 'views' ,'login.html'))
})

app.get("/logout" , (req,res)=>{
    res.clearCookie('data');
    res.redirect('/login');
})




app.post('/api/login' , async(req,res)=>{
    let {email , password} = req.body
    if(users[0].email == email && users[0].password == password){
        let token = jwt.sign(users[0] , 'qwerty' , {expiresIn : 60*60*60})
        res.cookie('data' , token , {httpOnly : true , maxAge : 900000})
        return res.render('homepage' , {user : users[0]})
    }else{
        res.redirect('/login')
    }
})




app.listen(3000)

