const express = require('express');
const app = express();
const cors = require('cors');
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


app.use(
  cors({
    origin: ['http://localhost:8000', 'http://localhost:3000'],
    credentials: true,
  })
);

const mealsRouter = require('./Routes/meal');
const workoutsRouter = require('./Routes/workout');

app.use('/api/meals', mealsRouter);
// app.use('/api/workouts', workoutsRouter);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
