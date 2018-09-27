const express = require('express');
const mongoos = require('mongoose');
const userRouter = require('./routes/users');

const app = express();
connectDB();

app.get('/', (req, res) => {
  res.send('index page view');
});

app.get('/api', (req, res) => {
  res.send('api documantaion');
});

app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => console.log(`app listing on port ${PORT}...`));

async function connectDB() {
  try {
    await mongoos.connect(
      'mongodb://localhost/myqa',
      { useNewUrlParser: true }
    );
    console.log('connected to database successfully');
  } catch (ex) {
    console.error('database connection error...', ex.message);
  }
}
