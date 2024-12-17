const express=require('express');
const router=express.Router();

const { books} = require('../controllers/books');
// const { books, bookId } = require('../controllers/books');
const { issued, issuedBook } = require('../controllers/issued');
const { returned, returnedBook } = require('../controllers/returned');
const { Delete } = require('../controllers/delete');
const {isLoggedIn}=require('../middlewares/login_middleware');

//Routes
router.get('/', (req, res)=>{
    res.render('home.ejs');
});

router.get('/books',isLoggedIn, books);
router.get('/books/issued',isLoggedIn, issued);
router.get('/books/returned',isLoggedIn, returned);
router.post("/book/returned",isLoggedIn, returnedBook);
router.post('/books/:id/username',isLoggedIn, issuedBook);
router.delete("/books/clear",isLoggedIn, Delete);

module.exports =router;