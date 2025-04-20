var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

// Настройка CORS
var corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// Подключение body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Настройка базы данных
var db = require('./app/config/db.config.js');
db.sequelize.sync({ force: false });

// Подключение статических файлов
app.use(express.static("files"));

// Настройка маршрутов
var book = require('./app/route/book.route.js');
book(app);  

var auth = require('./app/route/auth.route.js');
auth(app);

var trade = require('./app/route/trade.route.js');
trade(app);

var user = require('./app/route/user.route.js');
user(app);


// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
