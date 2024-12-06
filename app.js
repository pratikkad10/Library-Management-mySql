const mysql = require('mysql2'); 
const express=require('express'); 
const app=express();
const path=require('path'); 
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
const { v4: uuidv4 } = require('uuid');
const { count, log } = require('console');
const port=5000;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));



const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Pratik@123',
    database: 'library'
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL!');
});


//Default route....
app.get('/', (req, res)=>{
    res.render('home.ejs');
});

app.get('/books', (req,res)=>{
    let q1=`SELECT * FROM books`;
    connection.query(q1, (err, result)=>{
        let data=result;
        try {
            if(err) throw err;
            res.render("books.ejs", {data});
        } catch (error) {
            res.send("Error has been occured!")
        }
        // console.log(result);
    })
    
});

app.get('/books/issued', (req,res)=>{
    let q2=`SELECT * FROM issuedbooks`;
    connection.query(q2, (err, result)=>{
        let data=result;
        try {
            if(err) throw err;
            res.render("issued.ejs", {data});
        } catch (error) {
            res.send("Error has been occured!")
        }
        // console.log(result);
    })
    
});

app.get('/books/returned', (req,res)=>{
    let q3=`SELECT * FROM returnedbooks`;
    connection.query(q3, (err, result)=>{
        let data=result;
        try {
            if(err) throw err;
            res.render("returned.ejs", {data});
        } catch (error) {
            res.send("Error has been occured!")
        }
        // console.log(result);
    })
    
});

app.post("/book/returned", (req,res)=>{
    let {book_id, title, author, username, issued_date}= req.body;
    // res.send("Working");
    
    let q6=`
            INSERT INTO returnedbooks ( book_id,title,author,username,issue_date,return_date)
            VALUES 
            (?,?,?,?,?, CURDATE())`;

    connection.query(q6, [book_id, title, author, username, issued_date], (err, result)=>{
        try {
            if(err) throw err;

            let q7=`DELETE FROM issuedbooks WHERE book_id = '${book_id}'`;
            connection.query(q7, (err, result)=>{
                try {
                    if(err) throw err;
                    res.redirect('/books/issued');
                } catch (error) {
                    res.send("Error occuredd in issuedbook");
                }
            });
        } catch (error) {
            res.send("Error occured in Returning book!");
        }
    });
});

app.get('/books/:id', (req,res)=>{
    let {id}=req.params;
    let q4=`SELECT * FROM books WHERE book_id=${id}`;
    connection.query(q4, (err, result)=>{
        try {
            if(err) throw err;
            console.log(result[0]);   
            let bookDetails=result[0];
            res.render('user.ejs', {bookDetails});
            
        } catch (error) {
            res.send("Error has been occured!");
        }
    })
});

app.post('/books/username', (req,res)=>{
    let {username}=req.body;
    console.log(username);
    let {book_id, title, author}=req.body.book;
    //adding data to issuedbooks table
    let q5=`INSERT INTO issuedbooks (book_id, username,title, author, issue_date, return_date)
            VALUES (?,?,?,?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY))`;

    connection.query(q5, [book_id, username, title, author], (err, result)=>{
        try {
            if(err) throw err;
            res.redirect('/books/issued');
        } catch (error) {
            res.send("Error has been occured!");
        }
    }) 
});

app.delete("/books/clear", (req,res)=>{
    let q8=`DELETE FROM returnedbooks`;
    connection.query(q8, (err, result)=>{
        try {
            if(err) throw err;
            res.redirect('/books');
        } catch (error) {
            res.send("Error in query!");
        }
    });
});


//login 

app.get('/user/login', (req, res)=>{

    res.render("login.ejs");
});

app.post('/user/login', (req,res)=>{
    let {username, password}=req.body;
    let q11=`SELECT * FROM usersdata WHERE username = ? AND password =?`;
    connection.query(q11, [username, password], (err, result)=>{
        // res.send(`Login successful ${username}`);
        res.render('loginhome.ejs', {username});
    })
});

app.post('/user/register', (req, res)=>{
    console.log(req.body);
    let {username, Email, password} = req.body;
    let q10=`SELECT * FROM usersdata WHERE username = ? AND password =?`;
    connection.query(q10,[username, password], (err, result)=>{
        try {
            if(err) throw err;
            if(result.length===0){
                if(result.password === result.c_password){
                let q9=`INSERT INTO usersdata (username, Email, password) VALUES (?, ?, ?)`;
                connection.query(q9,[username, Email, password], (err, result)=>{
                    console.log(result);
                    if(err) throw err;
                    // req.session.user = { username };
                    res.redirect('/');
                    // res.send('succesfully added user!');
                    
                });
                }
                else{
                    res.send("Password does not match!");
                }
            }
            else{
                res.send("user already present!")
            }
        } catch (error) {
            res.send("Error in database!1")
        }
    });
    
});



//register
app.get("/user/register", (req, res)=>{
    res.render("register.ejs");
});

app.listen(port, (req, res)=>{
    console.log(`App listening on port: ${port}`);
});