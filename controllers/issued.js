//Import mysql connection
const connection=require('../config/sql.config');

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

//Issued book data update
module.exports.issuedBook= (req,res)=>{
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
};