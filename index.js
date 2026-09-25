const express = require('express')
const app = express()
const port = 3000
let ejs = require('ejs'); 
const bodyParser = require('body-parser');


app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hello', (req, res)=>{
    res.sendFile(__dirname + '/hello.html')
})

app.get('/hello-ejs', (req, res) => {
  res.render('prueba-ejs',{name:'Jesus', lastname:'gil'})
})

app.get('/form', (req,res)=>{
    res.render('form-persona')
})

app.post('/form-submit', (req,res)=>{
  const {name, lastname, ciudad} = req.body;
  res.render('prueba-ejs', {name, lastname, ciudad})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
