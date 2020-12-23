//This returns a function
const express=require('express');

const mongoose = require('mongoose');
const cookieParser=require('cookie-parser');
//calling the express function
const app=express();
const complains=require('./routes/Complains');
const loged=require('./routes/login');
const Complain=require('./models/complain');
const checkAuth=require('./middleware/auth');
//built in middleware for serving static files
app.use(cookieParser());
app.use(express.static('public'));
// complain api routes
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/complains',complains);

app.use('/loged',loged);
//mongoose.connect returns a promise
mongoose.connect('mongodb://localhost/HostelManagement',{useNewUrlParser:true})
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err=>console.error('Could not connect to MongoDb'));

// set template engine as ejs
// express by default looks for view engines in '/views' directory
app.set('view engine', 'ejs');

// recognize the incoming Request Object as a JSON Object

// basic routes

app.get('/', (req, res) => {
    
    const data = [
        {"name":"Drake", "type":"Electrical", "RoomNo":"A-324", "typeOF":"Fan", "problem":"lorem ipsum", "phone":"1233456"},
        {"name":"Drake", "type":"Electrical", "RoomNo":"A-324", "typeOF":"Fan", "problem":"lorem ipsum", "phone":"1233456"},
        {"name":"Drake", "type":"Electrical", "RoomNo":"A-324", "typeOF":"Fan", "problem":"lorem ipsum", "phone":"1233456"},
        {"name":"Drake", "type":"Electrical", "RoomNo":"A-324", "typeOF":"Fan", "problem":"lorem ipsum", "phone":"1233456"},
        {"name":"Drake", "type":"Electrical", "RoomNo":"A-324", "typeOF":"Fan", "problem":"lorem ipsum", "phone":"1233456"},
        {"name":"Drake", "type":"Electrical", "RoomNo":"A-324", "typeOF":"Fan", "problem":"lorem ipsum", "phone":"1233456"},
        {"name":"Drake", "type":"Electrical", "RoomNo":"A-324", "typeOF":"Fan", "problem":"lorem ipsum", "phone":"1233456"},
        {"name":"Drake", "type":"Electrical", "RoomNo":"A-324", "typeOF":"Fan", "problem":"lorem ipsum", "phone":"1233456"},
    ];

    res.render('index', { data }); 
});

app.get('/complaint', (req, res) => {
    // rendering index page as profile doesn't exist yet
    res.render('complaintForm');
});

app.get('/profile',checkAuth, (req, res) => {
    // rendering index page as profile doesn't exist yet
    res.render('profile');
});

app.get('/about', (req, res) => {
    // rendering index page as about-us doesn't exist yet
    res.render('index');
});

app.get('/contact', (req, res) => {
    // rendering index page as contact-us doesn't exist yet
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('sign');
});


const port =process.env.PORT || 3000;
//asynchronous function handles wih callback
app.listen(3000,()=>console.log(`Listening to port ${port}...`));