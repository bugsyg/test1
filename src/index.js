const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')


const app = express(); 
var mongo = require("./database")
require('./config/passport')
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, "/views"));
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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

app.use(express.static(path.join(__dirname, "/public")));

app.listen(app.get('port'));