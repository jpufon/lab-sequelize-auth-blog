const express = require('express');
const app = express();
const helmet = require('helmet');
const port = 5432;
const passport = require('passport');
require('./auth/passport-config')(passport)

const cookieSession = require('cookie-session');

app.use(express.static('public'));
app.use(helmet())
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cookieSession({
    name: 'session',
    keys: ['gq;neoisandgwe23gin'],
    maxAge: 14 * 24 * 60 * 60 * 1000
}))

app.use(passport.initialize());

app.use(passport.session())

//routes 
app.use(require('./routes/index.js'))
app.use(require('./routes/blog-post.js'))
app.use(require('./routes/login.js'))
app.use(require('./routes/registration.js'))
app.use(require('./routes/admin.js'))
app.use(require('./routes/about.js'))


app.listen(port, () => {
    console.log(`listening on ort ${port}`);
})