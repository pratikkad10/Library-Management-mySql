const express=require('express'); 
const app=express();
const expressLayouts=require('express-ejs-layouts');

const path=require('path'); 

var methodOverride = require('method-override');
app.use(methodOverride('_method'));
// const { v4: uuidv4 } = require('uuid');
// const { count, log } = require('console');

const port=5000;
app.use(express.urlencoded({ extended: true }));



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));



//mongoose connection
const dbConnect=require('./config/mongo.config');
// dbConnect();



//books routes
const bookRoutes=require('./routes/book.route');
app.use('/', bookRoutes);

//login-signup routes-
const userRoutes=require('./routes/user.route');
app.use('/', userRoutes);


//Default route....
app.get('/', (req, res)=>{
    res.render('home.ejs');
});

app.listen(port, (req, res)=>{
    console.log(`App listening on port: ${port}`);
});