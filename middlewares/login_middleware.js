module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.user);
    
    if(!req.isAuthenticated()){
        console.log("Please login to access these route!");
        return res.redirect('/user/login');
    }
    next();
}