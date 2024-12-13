//login - register routes
const express=require('express');
const router=express.Router();

router.get('/login', (req,res)=>{
    res.render('login.ejs')
})
router.get('/register', (req,res)=>{
    res.render('register.ejs')
})

// router.post('/login', );
// router.post('/register', );

module.exports=router;