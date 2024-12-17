//Import mysql connection
const connection=require('../config/sql.config');

//books handler
module.exports.books= (req,res)=>{
        let q1=`SELECT * FROM books`;
        connection.query(q1, (err, result)=>{
        let data=result;
        try {
            if(err) throw err;
            res.render("books.ejs", {data});
        } catch (error) {
            res.send("Error has been occured!");
            res.status(500).send("An error occurred while fetching the books!");
        }
    })
}

// module.exports.bookId= (req,res)=>{  //no need
//     let {id}=req.params;
//     let q4=`SELECT * FROM books WHERE book_id=${id}`;
//     connection.query(q4, (err, result)=>{
//         try {
//             if(err) throw err;
//             // console.log(result[0]);   
//             let bookDetails=result[0];
//             res.render('user.ejs', {bookDetails});
            
//         } catch (error) {
//             res.send("Error has been occured!");
//         }
//     })
// }