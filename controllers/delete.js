//Import mysql connection
const connection=require('../config/sql.config');

//Issued books handler
module.exports.Delete= (req,res)=>{
    let q8=`DELETE FROM returnedbooks`;
    connection.query(q8, (err, result)=>{
        try {
            if(err) throw err;
            res.redirect('/books');
        } catch (error) {
            res.send("Error in query!");
        }
    })
};