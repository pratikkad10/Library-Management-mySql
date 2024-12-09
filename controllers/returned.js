//Import mysql connection
const connection=require('../config/sql.config');

//Returned books handler
module.exports.returned= (req,res)=>{
    let q3=`SELECT * FROM returnedbooks`;
    connection.query(q3, (err, result)=>{
        let data=result;
        try {
            if(err) throw err;
            res.render("returned.ejs", {data});
        } catch (error) {
            res.send("Error has been occured!")
        }
    })
}



module.exports.returnedBook=(req,res)=>{
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
}

