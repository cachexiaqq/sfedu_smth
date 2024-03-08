// Импорт модуля express для создания веб-сервера
import express from 'express';
// Импорт модуля mongoose для работы с MongoDB
import mongoose from 'mongoose';
// Импорт модуля cors для обработки кросс-доменных запросов
import cors from 'cors';
// Импорт модуля body-parser для обработки JSON-формата тела запроса
import bodyParser from 'body-parser';

// Установка порта для сервера
const port = 4444;

// Создание экземпляра приложения Express
const app = express();

// Использование middleware для обработки CORS запросов
app.use(cors());

// Использование middleware для парсинга URL-encoded тела запроса
app.use(express.urlencoded());

// Использование middleware для парсинга JSON-формата тела запроса
app.use(bodyParser.json());

// Подключение к MongoDB базе данных
mongoose.connect('mongodb+srv://admin:123852zZ@projectsfedu.rcnxfdu.mongodb.net/SfeduProject')
    .then(() => console.log('Подключение к базе данных успешно')) // Вывод сообщения при успешном подключении
    .catch((err) => console.log('Ошибка подключения к базе данных', err)); // Вывод сообщения об ошибке при неудачном подключении

// Определение схемы для модели пользователя
const UserSchema = new mongoose.Schema({
    // Определение поля email с типом String и обязательным статусом
    email: {
        type: String,
        required: true
    },
    // Определение поля name с типом String и обязательным статусом
    name:{
        type: String,
        required: true
    },
    // Определение поля nameCompany с типом String и обязательным статусом
    nameCompany: {
        type: String,
        required: true
    },
    // Определение поля position с типом String и обязательным статусом
    position:{
        type: String,
        required: true
    },
    // Определение поля phoneNumber с типом Number и обязательным статусом
    phoneNumber: {
        type: Number,
        required: true
    },
    // Определение поля questions с типом String
    questions:{
        type: String
    },
    // Определение поля legalEntity с типом Boolean и обязательным статусом
    legalEntity:{
        type: Boolean,
        required: true
    }
});

// Создание модели пользователя на основе определенной схемы
const UserModel = mongoose.model("users", UserSchema);

// Обработчик GET-запроса для получения всех пользователей
app.get('/feed', (req, res) =>{
    UserModel.find({}).then(function(users){
        res.json(users); // Отправка ответа в формате JSON с пользователями
    }).catch(function(err){
        console.log(err); // Вывод ошибки в консоль
    });
});

// Обработчик POST-запроса для создания нового пользователя
app.post('/feedback', (req, res) =>{
    try{
        const doc = new UserModel({
            email: req.body.email,
            name: req.body.name,
            nameCompany: req.body.nameCompany,
            position: req.body.position,
            phoneNumber: req.body.phoneNumber,
            questions: req.body.questions,
            legalEntity: req.body.legalEntity
        });
        UserModel.create(doc); // Создание пользователя в базе данных
        res.status(201).send("Все хорошо"); // Отправка ответа с кодом 201 и сообщением "Все хорошо"
    } catch (err) {
        console.log(err); // Вывод ошибки в консоль
        res.status(500).json({
          message: "Не удалось внести пользователя", // Отправка ответа с кодом 500 и сообщением "Не удалось внести пользователя"
        });
    }
});

// Обработчик GET-запроса для корневого URL
app.get('/', (req, res) =>{
    res.send('Hello from backend!!'); // Отправка ответа с текстом "Hello from backend!"
});

// Запуск сервера на указанном порту
app.listen(port, () =>{
    console.log(`Сервер запущен на порту ${port}`); // Вывод сообщения о запуске сервера в консоль
});