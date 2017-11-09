require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./server/users')
const path = require('path');
const bodyparser = require('body-parser');

const {pool} = require('./config');

const morgan = require('morgan');
function test(req, res, next){
  console.log(req.body);
  next();
}

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, '/public/assets/')));

// log the http layer
app.use(morgan('common'));
app.use('/api/users', userRouter);

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/public/index.html')
});

app.get('/profile', (req, res) =>{
  res.sendFile(__dirname + '/public/profile.html')
});


app.post('/', test, (req, res) =>{
  //let {firstname, lastname, email, password} = req.body
  res.send("hello");
  //console.log(req.body)
  //res.status(201).json({result: "success"})
});





app.get('/login.html', (req, res) =>{
  res.sendFile(__dirname + '/login.html')
});

app.get('/:test', (req, res) =>{
  const test = req.params.test
  console.log(req.params)
  res.send('test after :' + test)
});

app.listen(9000, function(){
  console.log('listen on port 9000');
});
