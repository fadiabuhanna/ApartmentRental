const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const app = express();
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: process.env.MONGODB,
    connectionOptions: {
        auth: {
            username: process.env.MONGODBUser,
            password: process.env.MONGODBPassword
        }
    },
    collection: 'mySessions'
});

const mongoose = require('mongoose');
const { read } = require('fs');
const UserModel = require('./models/User');
const accountRouter = require('./routes/account');
const accountAdmin = require('./routes/admin');

mongoose.connect(process.env.MONGODB, {

    dbName: 'Apartment',
    auth: {
        user: process.env.MONGODBUser,
        password: process.env.MONGODBPassword,
        authdb: 'admin'
    },
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true

});

app.use(session({
    secret: 'some-long-ass-string-here',
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    store: store,
    resave: false,
    saveUninitialized: false
}));


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/assets", express.static("public"))
app.use("/account", accountRouter);
app.use("/admin", accountAdmin);

app.get('/userinfo', async (req, res) => {
    try {
        const user = await UserModel.findById(req.session.user._id).exec()
        res.send({
            firstName: user.firstName,
            lastName: user.lastName,
            mail: user.mail,
            mobile: user.mobile,
            city: user.city,
            EntryDate: user.EntryDate,
            ReleaseDate: user.ReleaseDate

        })
    } catch (err) {
        console.error(err);
        res.status(500);
    }
})

app.get('/users', async (req, res) => {
    const users = await UserModel.find().exec()
    res.send(users)
})

app.post("/add-apartment", async (req, res) => {
    console.log({ session: req.session.user })
    const user = await UserModel.findById(req.session.user._id).exec()
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.mail = req.body.mail;
    user.mobile = req.body.mobile;
    user.city = req.body.city;
    user.EntryDate = req.body.EntryDate;
    user.ReleaseDate = req.body.ReleaseDate;

    await user.save()
    res.redirect("/");
})

app.get("/", (req, res) => res.sendFile(path.resolve("pages/index.html")))
app.use("/", (req, res) => res.sendStatus(404));

app.listen(process.env.PORT || 3000);