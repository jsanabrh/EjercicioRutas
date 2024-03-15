const express = require('express');
const connectDB = require('./config/database.js');
const routes = require('./routes/index.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);


app.listen(port, () => console.log(`Servidor escuchado en el puerto http://localhost:${port}`));