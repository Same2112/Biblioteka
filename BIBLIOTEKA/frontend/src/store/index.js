import { createStore } from "vuex";
import auth from './auth.module';  // Импорт модуля для аутентификации
import books from './books.module';
import trade from './trade.module'; 

const store = createStore({
  modules: {
    auth: auth,
    books: books,
    trade: trade,
    },
});

export default store;