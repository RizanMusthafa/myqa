const express = require('express');
const mongoos = require('mongoose');
const userRouter = require('./routes/users');
const questionRouter = require('./routes/question');

const app = express();
connectDB();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('index page view');
});

app.get('/api', (req, res) => {
  res.send('api documantaion');
});

app.use('/api/users', userRouter);
app.use('/api/questions', questionRouter);

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
