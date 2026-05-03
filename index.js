require('dotenv').config();

const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const db      = require('./models')
const cors    = require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

require('./routes')(app);

db.sequelize.sync({
    // force:true
}).then (()=>{
    console.log('db resync')
});

app.listen(port,()=>{
    console.log(`API escuchando en puerto ${port}`)
});