const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
/*const cookieRouter = require("cookie-parser");*/
const cookieParser = require('cookie-parser');
const app = express();
const session = require("express-session");
const mongoose = require('mongoose');
const { read } = require('fs');
const UserModel = require('./models/User');
const accountRouter = require('./routes/account');
const accountAdmin = require('./routes/admin');

/*mongoose.connect('mongodb://localhost:27017', {   

   dbName:'Apartment',
    auth:{
        user:'root',
        password:'example',
        authdb: 'admin'
    },
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});*/
mongoose.connect(process.env.MONGODB,{   

    dbName:'Apartment',
     auth:{
         user:process.env.MONGODBUser,
         password:process.env.MONGODBPassword,
         authdb: 'admin'
     },
     useCreateIndex: true,
     useNewUrlParser: true,
     useUnifiedTopology: true
 
 });

/*mongoose.connect(process.env.MONGODB,{   
//'mongodb+srv://cluster0.2yz5r.mongodb.net?retryWrites=true&w=majority'
//mongodb://localhost:27017
   dbName:'Apartment',
    auth:{
        user:'root',
        password:'example',
        authdb: 'demodb'
    },
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true

});
 */

app.use(session({
    secret: 'some-long-ass-string-here',
    cookie:{
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false
}));


app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/assets", express.static("public"))
app.use("/account", accountRouter);
app.use("/admin", accountAdmin); 

app.get('/userinfo',async (req,res)=>{
    const user = await UserModel.findById(req.session.user._id).exec()
    res.send({
        firstName:user.firstName,
        lastName:user.lastName,
        mail:user.mail,
        id:user.id,
        mobile:user.mobile,
        city:user.city,
        numberCard:user.numberCard,
        ThreeNumberCard:user.ThreeNumberCard,
        cardValidity:user.cardValidity,
        EntryDate:user.EntryDate,
        ReleaseDate:user.ReleaseDate

    })
})


app.post("/add-apartment",async (req,res)=>{
    console.log({session:req.session.user})
     const user = await UserModel.findById(req.session.user._id).exec()
     user.firstName = req.body.firstName;
     user.lastName = req.body.lastName;
     user.mail=req.body.mail;
     user.id=req.body.id;
     user.mobile=req.body.mobile;
     user.city=req.body.city;
     user.numberCard=req.body.numberCard;
     user.ThreeNumberCard=req.body.ThreeNumberCard;
     user.cardValidity=req.body.cardValidity;
     user.EntryDate=req.body.EntryDate;
     user.ReleaseDate=req.body.ReleaseDate;

     await user.save()
     //console.log({data});
    res.redirect("/");
})

app.get("/", (req, res) => res.sendFile(path.resolve("pages/index.html")))
app.use("/", (req, res) => res.sendStatus(404));

app.listen(process.env.PORT || 3000);