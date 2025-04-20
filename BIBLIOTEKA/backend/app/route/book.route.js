module.exports = (app) => {

    const book = require('../controller/book.controller');

    var { authJwt } = require("../middleware");
    
    app.get('/api/books', book.getAllBooks);
    app.post('/api/addBooks', [authJwt.verifyToken], book.addBook);
    app.get('/api/mybooks', [authJwt.verifyToken], book.getUserBooks);
    app.get('/api/availablebooks', [authJwt.verifyToken], book.getAvailableBooks);
    app.get('/api/books/:id', book.getBookById);
    app.put('/api/books/:id', [authJwt.verifyToken], book.updateBook);
    app.get('/api/availablebooks/:id', [authJwt.verifyToken], book.getBookById);
    app.delete('/api/books/:id', [authJwt.verifyToken], book.deleteBook);
};