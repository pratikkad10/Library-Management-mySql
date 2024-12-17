//login - register routes
const express=require('express');
const { signup, loginHandler } = require('../controllers/auth');
const passport=require('passport');
const router=express.Router();

router.get('/login', (req,res)=>{
    res.render('login.ejs')
})
router.get('/register', (req,res)=>{
    res.render('register.ejs')
})

router.post('/login',  passport.authenticate('local', 
    { failureRedirect: '/user/login', failureFlash:true }),
    loginHandler);

router.post('/register', signup);

router.get('/logout', (req,res,next)=>{
    req.logout((err)=>{
        return next(err);
    })

    console.log("user logged out!");
    res.redirect('/');
    
})

module.exports=router;