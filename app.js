const dotenv =require('dotenv')
dotenv.config()
const exphbs = require('express-handlebars')
const express =require('express')
// const bodyParser =require ('body-parser')
const cookiParser =require('cookie-parser')
const {verify} = require('./middleware')
const {login,commentsRouteHandler} =require('./controller')
const app = express()

// Middleware to recognize strings and arrays in requests
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
//add cookie parser to the app
app.use(cookiParser())

// app.use(bodyParser.urlencoded({ extended: false })); 
// app.use(bodyParser.json())


app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/loginform',(re,res)=>{
    res.render('login')
})
app.post('/login',login)
app.get('/comments', verify, commentsRouteHandler)

app.listen(3000,()=>{
    console.log('app listening on 3000')
})
