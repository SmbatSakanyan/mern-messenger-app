const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/api/users');
const conversationsRoute = require('./routes/api/conversations')(io);

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => console.log('user disconnected'));
});

app.use('/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/conversations', conversationsRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 80;
server.listen(port, () => console.log(`Server running on port ${port}`));