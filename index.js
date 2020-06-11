const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const connectDB = require('./config/db');
const { check, validationResult } = require('express-validator');

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())


connectDB();

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.get('/', (req, res)=>{
	res.send("Hello");
})

const port = process.env.PORT || 5000 ;
app.listen(port, ()=>console.log("Server Started..."));