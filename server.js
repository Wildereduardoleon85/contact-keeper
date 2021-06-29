const express = require('express');
const connectDB = require('./config/db');

//Initializations
const app = express();

//Connect Database
connectDB();

//Middlewares
app.use(express.json({extended: false}));

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));