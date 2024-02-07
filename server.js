const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const configDB = require('./config/db');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

configDB();
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to tracalorie API' });
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mealsRouter = require('./Routes/meal');

app.use('/api/meals', mealsRouter);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
