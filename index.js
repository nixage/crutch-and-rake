const express = require('express');
const bodyParser = require("body-parser");
const { v4: uuid } = require('uuid');
const app = express();
const jsonParser = bodyParser.json()

app.use(bodyParser.urlencoded({extended:false}))
app.use(jsonParser)

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const users = [
  {id: uuid(), userName: 'misha', email:'misha@mail.ru'},
  {id: uuid(), userName: 'ivan', email:'ivan@gmail.com'},
  {id: uuid(), userName: 'petro', email:'petro@mail.ru'},
  {id: uuid(), userName: 'max', email:'max@gmail.com'},
]
 
app.get('/users', function (req, res) {
  res.json(users)
})
 
app.post('/users', function (req, res) {
  const userName = req.body.userName
  const email = req.body.email
  console.log(req.body)
  console.log(userName)
  if(!validateEmail(email)){
    res.json({msg: 'incorrect email'})
    return
  }
  if(!validateName(userName)){
    res.json({msg: 'only english(1-25 words)'})
    return
  }

  users.push({
    id: uuid(),
    userName: userName,
    email: email
  })

  res.json({msg: 'User add'})
  return
})

app.get('/users/:userId', function (req, res) {
  const id = req.params.userId

  const user = users.find( (val ) => val.id === id);

  if (user) {
    res.json(user)
    return
  }
  else{
    res.json({msg: `user by id (${id}) is not found`})
    return
  }
})
 
app.listen(8181, function () {
  console.log('Example app listening on port 8181');
})


// FUNCTION REGEXP
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateName(name) {
  const re = /^[a-zA-Z]{1,24}$/
  return re.test(String(name).toLocaleLowerCase())
}
