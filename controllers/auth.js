const User=require('../models/user.model');

exports.signup=async (req,res)=>{
    try {
        
        let {username, Email, password}=req.body;
        // console.log(req.body);
        

        const existingUser=await User.findOne({username});

        if(existingUser){
            res.send("User already exists!");
            res.redirect('/user/login');
        }

        const newUser= new User({Email,username});
        const registeredUser=await User.register(newUser, password);
        
        // console.log(registeredUser);
        
        
        req.login(registeredUser, (error)=>{
            if(error){
                console.log(error);
                res.send("error occured while login! ",error);
            }
            res.redirect('/')
        })

    } catch (error) {
            console.log("Kya hua bhai yaha kyu aaye ho!");
            console.log(error);
            
            res.redirect('/user/register');
    }
}


exports.loginHandler=async (req,res)=>{
    console.log("Logged In Successfully!");
    
    res.render('home.ejs');
}