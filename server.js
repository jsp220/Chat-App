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
    secret: process.env.SECRET,
    cookie: {
        maxAge: 18000000
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

hbs.handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {

    http.listen(PORT, () => {
        console.log(`Socket.IO server running at http://localhost:${PORT}/`);

    });
})
    
// Connect Socket for message chat.
io.on('connection', (socket) => {
    // Every time localhost:PORT connection is made
    // show message on console.
    console.log(":electric_plug: User connected!");
    socket.on('chat message', (msg, info) => { io.emit('chat message', msg, info); });
});