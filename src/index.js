const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const session = require('express-session')

const app = express(); 
var mongo = require("./database")
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, "views"));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs'
}))

app.set('view engine', '.hbs');

app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'))
app.use(session({
    secret: 'reides',
    resave: true,
    saveUninitialized: true
}))

app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

app.use(express.static(path.join(__dirname, "publicnp")));

app.listen(app.get('port'));