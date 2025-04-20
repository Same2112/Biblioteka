import { createWebHistory, createRouter } from "vue-router";
import store from "../store/index";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => {
            return import("../views/authorization/Login.vue");
        }
      },
    {
        path: "/listBooks",
        name: "listBooks",
        alias: "/listBooks",
        component: () => {
            console.log("Загрузка компонента ListBooks...");
            return import("../views/book/ListBooks.vue");
        },
        meta: {
            title: "Список книг",
            requiredAuth: true
        }
    },
    {
        path: "/listMyBooks",
        name: "listMyBooks",
        alias: "/listMyBooks",
        component: () => import('../views/book/ListMyBooks.vue'),
        meta: {
            title: "Список книг",
            requiredAuth: true
        }
    },
    {
        path: "/book/:id",
        name: "book-details",
        component: () => import('../views/book/Book.vue'),
        props: true, 
        meta: {
            title: "Книга",
            requiredAuth: true
        }
    },
    {
        path: "/addBooks",
        name: "add-books",
        component: () => import('../views/book/AddBooks.vue'),
        meta: {
            title: "Добавление Книги",
            requiredAuth: true
        }
    },
    {
        path: "/searchbook",
        name: "search-book",
        component: () => import('../views/book/SearchBooks.vue'),
        meta: {
            title: "Поиск книги",
            requiredAuth: true
        }
    },
    {
        path: "/login",
        name: "login-user",
        component: () =>  import('../views/authorization/Login.vue'),
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component:  () => import('../views/authorization/Register.vue'),
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component:  () => import('../views/authorization/Profile.vue'),
        meta: {
            title: "Профиль пользователя",
            requiredAuth: true
        }
    },
    {
        path: "/booktrade/:id",
        name: "bookTrade",
        component:  () => import('../views/book/BookTrade.vue'),
        meta: {
            title: "Книга обмен",
            props: true,
            requiredAuth: true
        }
    },
    {
        path: "/Trade",
        name: "Trade",
        component:  () => import('../views/trade/Trade.vue'),
        meta: {
            title: "Обмен",
            props: true,
            requiredAuth: true
        }
    },
    {
        path: "/RegisterAdmin",
        name: "RegisterAdmin",
        component:  () => import('../views/authorization/RegisterAdmin.vue'),
        meta: {
            title: "Обмен",
            props: true,
            requiredAuth: true
        }
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach(async (to, from, next) => {
    // устанавливаем заголовок страницы в зависимости от метаданных маршрута
    document.title = to.meta.title || "Главная страница";

    // проверяем наличие токена и срок его действия
    const isTokenActive = await store.getters["auth/isTokenActive"];

    // если токен действителен, продолжаем навигацию
    if (isTokenActive) {
        return next();
    }

    // получаем пользователя из локального хранилища
    const user = JSON.parse(localStorage.getItem("user")); 
    console.log(user)

    if (user) {
        try {
            // пытаемся обновить токен
            await store.dispatch("auth/refreshToken", user);
            return next(); // Если обновление прошло успешно, продолжаем навигацию
        } catch (err) {
            console.error("Ошибка обновления токена:", err); // логируем ошибку
            localStorage.removeItem("user"); // удаляем пользователя из локального хранилища
            return next({ path: "/login" }); // переходим на страницу входа
        }
    } else {
        // если токена нет или он истек, проверяем, требуется ли авторизация для доступа к маршруту
        localStorage.removeItem("user"); // удаляем пользователя из локального хранилища

        if (to.meta.requiredAuth) {
            return next({ path: "/login" }); // если доступа нет, перенаправляем на страницу входа
        }
    }

    // если маршрут не требует авторизации, продолжаем навигацию
    return next();
});

export default router;