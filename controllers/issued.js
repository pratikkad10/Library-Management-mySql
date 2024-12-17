//Import mysql connection
const connection=require('../config/sql.config');
// const { bookId } = require('./books');

//Issued books handler
module.exports.issued= (req,res)=>{
    let q2=`SELECT * FROM issuedbooks`;
    connection.query(q2, (err, result)=>{
        let data=result;
        try {
            if(err) throw err;
            res.render("issued.ejs", {data});
        } catch (error) {
            res.send("Error has been occured!")
        }
    })
}

let book_id, title, author;
//Issued book data update
module.exports.issuedBook= (req,res)=>{
    let {username}=req.user;                 //due to this logged in user wll issue book
    console.log(username);

    let {id}=req.params;
    console.log("id", id);
    
    let q4=`SELECT * FROM books WHERE book_id=${id}`;
    connection.query(q4, (err, result)=>{
        try { 
           
            console.log("result", result);
           ({book_id, title, author}=result[0]);
           
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

            
        } catch (error) {
            res.send("Error has been occured!");
        }
    })
    
    
};