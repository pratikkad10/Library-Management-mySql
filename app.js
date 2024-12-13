const express=require('express'); 
const app=express();
const expressLayouts=require('express-ejs-layouts');
const session = require('express-session'); 
const flash = require('connect-flash');
const path=require('path'); 
require('dotenv').config();
const PORT=process.env.PORT;

const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user.model');

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//session
const sessionOptions = {
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    }
};

app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.session(sessionOptions));

//passport configuration
app.use(session(sessionOptions));

app.use(flash());
app.use((req, res, next) => {
    res.locals.currUser = req.user || null;
    res.locals.messages = req.flash();
    next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//mongoose connection
const dbConnect=require('./config/mongo.config');
dbConnect();

//books routes
const bookRoutes=require('./routes/book.route');
app.use('/', bookRoutes);

//login-signup routes-
const userRoutes=require('./routes/user.route');
app.use('/user', userRoutes);

app.listen(PORT, (req, res)=>{
    console.log(`App listening on port: ${PORT}`);
});

