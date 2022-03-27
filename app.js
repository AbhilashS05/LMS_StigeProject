const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://user:1234@cluster0.vjhma.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(port, host))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/learning', requireAuth, (req, res) => res.render('learning'));
app.get('/profile', requireAuth, (req, res) => res.render('profile'));
app.get('/task', requireAuth, (req, res) => res.render('task'));
app.use(authRoutes);