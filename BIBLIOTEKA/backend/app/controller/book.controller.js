const db = require('../config/db.config.js');
const { sendResult, sendError } = require('../config/global.functions.js');

const Book = db.book;
const User = db.user;

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        sendResult(res, books);
    } catch (err) {
        sendError(res, err);
    }
};

exports.addBook = async (req, res) => {
    try {
        const { name, author, count, description } = req.body;
        const userId = req.userId;

        if (!name || !author || !count || !description) {
            throw new Error("Не найдены");
        }

        const book = await Book.create({ name, author, count, description, user_id: userId });

        const user = await User.findByPk(userId);
        if (user) {
            await user.update({ count: user.count + count });
        } else {
            throw new Error("User не нашелся");
        }

        sendResult(res, { message: 'Книга добавлена', book });
    } catch (err) {
        console.error("Книга не добавлена", err);
        sendError(res, err);
    }
};


exports.getUserBooks = async (req, res) => {
    try {
        const userId = req.userId;
        const books = await Book.findAll({ where: { user_id: userId } });
        sendResult(res, books);
    } catch (err) {
        sendError(res, err);
    }
};

exports.getAvailableBooks = async (req, res) => {
    try {
        const userId = req.userId;
        const books = await Book.findAll({ where: { user_id: { [db.Sequelize.Op.ne]: userId } } });
        sendResult(res, books);
    } catch (err) {
        sendError(res, err);
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            sendResult(res, book);
        } else {
            sendError(res, { message: "Книга не найдена" });
        }
    } catch (err) {
        sendError(res, err);
    }
};


exports.updateBook = async (req, res) => {
    try {
        const { name, author, count, description } = req.body;
        const bookId = req.params.id;
        const userId = req.userId;
        const book = await Book.findOne({ where: { id: bookId, user_id: userId } });
        if (!book) {
            return sendError(res, { message: "НЕ найдена." });
        }
        const user = await User.findByPk(userId);
        if (user) {
            await user.update({ count: user.count - book.count + count});
        } else {
            throw new Error("User не нашелся");
        }

        await Book.update(
            { name, author, count, description },
            { where: { id: bookId, user_id: userId } }
        );

        const updatedBook = await Book.findByPk(bookId);
        sendResult(res, { message: 'Книга успешно обновлена', updatedBook });
    } catch (err) {
        console.error("ошибка добавления:", err);
        sendError(res, err);
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.userId;
        const user = await User.findByPk(userId);
        const book = await Book.findOne({ where: { id: bookId, user_id: userId } });
        if (user) {
            await user.update({ count: user.count - book.count});
        } else {
            throw new Error("User не нашелся");
        }
        if (!book) {
            return sendError(res, { message: "Книга не найденна" });
        }

        await Book.destroy({ where: { id: bookId, user_id: userId } });

        sendResult(res, { message: 'Книга удаленна' });
    } catch (err) {
        console.error("ерор удаления:", err);
        sendError(res, err);
    }
};