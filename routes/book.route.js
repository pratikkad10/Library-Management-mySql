const express=require('express');
const router=express.Router();

const { books, bookId } = require('../controllers/books');
const { issued, issuedBook } = require('../controllers/issued');
const { returned, returnedBook } = require('../controllers/returned');
const { Delete } = require('../controllers/delete');

//Routes
router.get('/', (req, res)=>{
    res.render('home.ejs');
});

router.get('/books', books);
router.get('/books/issued', issued);
router.get('/books/returned', returned);
router.post("/book/returned", returnedBook);
router.get('/books/:id', bookId);
router.post('/books/username', issuedBook);
router.delete("/books/clear", Delete);

module.exports =router;