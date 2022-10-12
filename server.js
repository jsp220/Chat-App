const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

const http = require('http').Server(app);
const io = require('socket.io')(http);

const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Acid Underline Orange',
    cookie: {
        maxAge: 1800000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
        console.log(
            `\nServer running on ${PORT}!`
            )
    );
})

// io.on('connection', (socket) => {
//     socket.on('chat message', msg => {
//         io.emit('chat message', msg);
//     });
// });

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });