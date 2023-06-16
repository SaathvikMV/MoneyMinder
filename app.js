if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const flash = require('connect-flash');
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const MongoDbStore = require('connect-mongo')
const localStrategy = require('passport-local')
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongo_sanitize = require('express-mongo-sanitize');
const User = require('./models/user.js')
const { isLoggedIn, setCurrentUser } = require('./middlewares/middleware.js')
const Authentication = require('./routes/Authentication.js')
const Dashboard = require('./routes/Dashboard.js')
const Insights = require('./routes/Insights.js')
const Loans = require('./routes/Loans.js')
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(mongo_sanitize())
app.use(express.json());
app.use(express.static("Public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const secret = process.env.secret || 'SAVEMONEY'
const store = new MongoDbStore({
    mongoUrl: process.env.DB_URL,
    secret,
    touchAfter: 24 * 60 * 60
})
store.on('error', function(e) {
    console.log(e)
})
const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected")
    })
    .catch((e) => {
        console.error.bind(e)
    })
passport.use(new localStrategy(User.authenticate()))
passport.use(User.createStrategy());
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
        });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});
app.use(setCurrentUser)
app.get("/", async(req, res) => {
    res.render('landing')
});
app.use(flash());
app.use('/', Authentication)
app.use("/:user/dashboard", isLoggedIn, Dashboard);
app.use("/:user/loans", isLoggedIn, Loans);
app.use("/:user/insights", isLoggedIn, Insights)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})
