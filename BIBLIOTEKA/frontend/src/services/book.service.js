import http from "../http-common";

function getAllBooks() {
    return http.get("/api/books");
}

function getUserBooks(userId) {
    return http.get(`/api/mybooks/${userId}`);
}

function addBook(book) {
    return http.post("/api/addBooks", book);
}

function getAvailableBooks(userId) {
    return http.get(`/api/availablebooks/${userId}`);
}

function getBookById(id) {
    return http.get(`/api/books/${id}`);
}




const bookService = {
    getAllBooks,
    getUserBooks,
    addBook,
    getAvailableBooks,
    getBookById
};

export default bookService;
