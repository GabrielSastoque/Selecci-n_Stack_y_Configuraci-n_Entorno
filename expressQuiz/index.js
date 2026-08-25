const express = require('express');
const path = require('path');
const conectarDB = require('./config/db');
const mueblesRouter = require('./routes/muebles');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

conectarDB();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/muebles');
});

app.use('/muebles', mueblesRouter);

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));