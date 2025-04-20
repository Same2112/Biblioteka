import bookService from '../services/book.service';

export const ADD_BOOK = 'ADD_BOOK';
export const SET_BOOKS = 'SET_BOOKS';
export const SET_AVAILABLE_BOOKS = 'SET_AVAILABLE_BOOKS';

const state = {
    books: [],
    availableBooks: []
};

const mutations = {
    [SET_BOOKS](state, books) {
        state.books = books;
    },
    [SET_AVAILABLE_BOOKS](state, books) {
        state.availableBooks = books;
    },
    [ADD_BOOK](state, book) {
        state.books.push(book);
    }
};

const actions = {
    async getAllBooks({ commit }) {
        try {
            const response = await bookService.getAllBooks();
            commit(SET_BOOKS, response.data);
        } catch (error) {
            console.error('Ошибка при получении всех книг:', error);
        }
    },
    async addBook({ commit }, book) {
        try {
            const response = await bookService.addBook(book);
            commit(ADD_BOOK, response.data.book);
            return response.data;
        } catch (error) {
            console.error('Ошибка при добавлении книги:', error);
            throw error;
        }
    },
    async getAvailableBooks({ commit }) {
        try {
            const response = await bookService.getAvailableBooks();
            commit(SET_AVAILABLE_BOOKS, response.data);
        } catch (error) {
            console.error('Ошибка при получении доступных книг:', error);
        }
    }
};

const getters = {
    books: (state) => state.books,
    availableBooks: (state) => state.availableBooks
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
