const express = require('express');
const app = express();
const port = 3000;
const expressHbs = require('express-handlebars');
const fs = require('fs');
const bodyparser = require('body-parser');
const { MongoClient } = require('mongodb');

const TelegramBot = require('node-telegram-bot-api');
const token = '5488284608:AAG1ECN_sc6ttgKHnr_iVc5z4sCM541K_b0';
const token2 = '5561254895:AAGMnbGRMJ7boj-Z4bQM3ZPVhTBvf6om6LY';
const bot = new TelegramBot(token, { polling: true });

// bot.onText(/\/echo (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const resp = match[1]; 
//   bot.sendMessage(chatId, resp);
// });
// [["Нічого", "Щось"], ["Не знаю"], ["Щось ще"]]










// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   console.log(msg);
//   bot.sendMessage(chatId, "Ого, які люди. Ну що сказати СЛАВА УКРАЇНІ!!!");
//   if (msg.new_chat_member) {
//     bot.sendMessage(chat.id, 'Привіт, ' + msg.new_chat_member.first_name, + "фівафіва");
//   }
//   console.log(msg.text);

//   if (msg.text === " що задали на дз") {
//     let keyboards = []; 
//     for (let i = 0, b=0; i<lessons.calendar.length; i++ ) {
//         let lessons = lessons.calendar[i];
//         if (i % 4 == 0 ) {
//             keyboards[b] = [];
//             b++;
//         }
//         keyboards[b - 1].push(lessons.month);
//     }
//     bot.sendMessage(chatId, 'Обери місяць: ', {
//         "reply_markup" : {
//             "keyboard": keyboards
//         }
//     });
//   }
//   for (let i = 0; i < lessons.calendar.length; i++ ) {
//     let lesson = lessons.calendar[i];
//     if (msg.text === lesson.month) {
//         let keyboards = []; 
//         let lesson_month = lessons.calendar.find((item) => item.month = lesson_month);
//         for (let j = 0; j < lesson_month.lessons.length; j++ ) {
//             let days = lesson_month.lessons[j];
//             keyboards.push(days.day_date);
//         }
//     }
//     bot.sendMessage(chatId, 'Обери день: ', {
//         "reply_markup" : {
//             "keyboard": [keyboards]
//         }
//     });
// }
// });

const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

const session = require('express-session');
const cookieParser = require('cookie-parser');
const secret = "dasdajskdsahj";

app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "views", 
        extname: "hbs"
    }
));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/views"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(session({ secret }));

app.use((req,res,next) => {
    if (!req.session.auth){
        req.session.user = {
            name: 'anonim',
            permission: 'anonim'
        }
        req.session.auth = true;
    }
    next();
})

const mongoUrl = 'mongodb+srv://admin:schjjl31082006@cluster0.itj23.mongodb.net/test';
const client = new MongoClient(mongoUrl);



    // socket.on('id', (msg) => {
    //     console.log('id: ' + msg );
    // });
let students = {};
let session_user;
io.on('connection', (socket) => {
    console.log('a user connected');

    students[socket.io] = session;
    console.log(students);

    socket.on('message', (msg) => {
        console.log(socket.id); 
        socket.emit( 'answer' , { user: session_user, message: msg })
        // { user: userss[socket.io], message: }
    });
    socket.on('disconecter', (msg) => {
        delete students[socket.id];
        console.log('disconecter user: ' + msg );
    });
});

async function main() {
    await client.connect();

    const db_users = client.db('users');
    const collection_users = db_users.collection('personal_info');


    const collection_comments = db_users.collection('zalik');


    const db_groups = client.db('groups');
    const collection_groups = db_groups.collection('lessons');

    let users = await collection_users.find({}).toArray();
    let groups = await collection_groups.find({}).toArray();
    console.log('Found documents =>', users); 
    
    
    app.get('/', async function(req, res) {
        res.render('main');
    });
    
    let session;
    let students = {};


    app.get('/comment', async function(req, res) {
        res.render('comment', {layout: 'comment'});
    });
    app.get('/news', async function(req, res) {
        res.render('news', {layout: 'news'});
    });

    app.get('/login', async function(req, res) {
        res.render('login', {layout: 'login'});
    });

    app.get('/chat', async function(req, res) {
        session_user = req.session.user;
        res.render('chat', {layout: 'chat'});
    });

    app.post('/auth', async function(req, res) {
        const filteredUser = await collection_users.find({ login: req.body.login }).toArray();
        let status = '';
        if(filteredUser.length) {
            if(filteredUser[0].password == req.body.password) {
                req.session.user = { name: filteredUser[0].first_name, permission: filteredUser[0].permission };
                res.redirect('/comment');
            } else {
                status = 'Пароль не правильний!';
            }
        } else {
            status = 'Такого користувача не знайдено!';
        }
        res.render('login', {
            layout: 'login',
            login: req.body.login,
            password: req.body.password,
            state: status
        });
    });

    app.get('/api/journal/:group/users', async function(req, res) {
        let findUsers = await collection_users.find({ group: req.params.group }).toArray();

        console.log(findUsers)

        let filteredUsers = findUsers.map( function(user) {
            return{
                first_name: user.first_name,
                second_name: user.second_name,
                marks: user.marks,
                group: user.group 
            }
        })
        res.send(filteredUsers);
    });

    app.get('/api/journal/:group/lessons', async function(req, res) {
        let findLessons = await collection_groups.find({ group_name: req.params.group }).toArray();
        res.send(findLessons);
    });

    


    app.get('/journal/:group', async function(req, res) {

        let findGroup = await collection_groups.find({ group_name : req.params.group }).toArray();

        if(findGroup.length) {
            res.render('journal', {
                layout: 'journal',
                group_name: findGroup[0].group_name,
                calendar : findGroup[0].calendar,
                group: req.params.group
            });
        } else {
            console.log ("група не знайдена")
        }

        res.render('journal', {
            layout: 'journal',
            // group_name: findGroup[0].group_name,
            // calendar : findGroup[0].calendar,
            group: req.params.group
        });
    }); 
    
    
    


    // let save_button = document.querySelector('.save');

    // save_button.addEventListener("click" , async function(){
    //     let rows = document.querySelectorAll(".row:not(.row-button)");
    //     let marks = [];


    //     for (let i = 0; i < rows.length; i++) {
    //         let user_name = rows[i].querySelector('.title').innerText;
    //         let second_name = user_name.split(' ')[0];
    //         let first_name = user_name.split(' ')[0];

    //         marks[i] = {
    //             second_name: second_name,
    //             first_name: first_name,
    //             marks: {
    //                 [mothes[currentMonth]]: {}
    //             }
    //         };
        

    //         rows[i].querySelectorAll('input').forEach(input => {
    //             let day = input.getAttribute('name');
    //             if (day) {
    //                 marks[i].marks[mothes[currentMonth]][day] = []; 
    //             }
    //         });
    //         rows[i].querySelectorAll('input').forEach(input => {
    //             let day = input.getAttribute('name');
    //             if (day) {
    //                 marks[i].marks[mothes[currentMonth]][day].push(+input.value); 
    //             }
    //         });
    //         console.log(marks);
    //     }
    //     await fetch(`/api${winsow.location.pathname}/update`, {
    //         method: 'POST',
    //         body: JSON.stringify(marks),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    // });
    app.get('/api/newcomm', async function(req, res) {
        let findComments = await collection_comments.find({ a: 'a' }).toArray();
        res.send(findComments);
    });

    app.post('/newcomm', async function(req, res){
        await collection_comments.insertOne({
            ...req.body,
            a: 'a'
        });
        res.redirect('/comment')
        bot.sendMessage( 591843864 , 'Новий відгук вже опублікований на вашій сторінці)');
    });

    app.post('/new_user/:group', async function(req, res){
        await collection_users.insertOne({
            ...req.body,
            permissions: 'student',
            group: req.params.group,
            marks: {
                "Червень" : {}
            }
        });
        res.redirect('/journal/' + req.params.group)
    });

    server.listen(port, async function(){
        console.log("running");
    }); 
}
main();