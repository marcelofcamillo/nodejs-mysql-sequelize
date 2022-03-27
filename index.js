import express from 'express';
import exphbs from 'express-handlebars';
import conn from './db/conn.js';
import User from './models/User.js';

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/users/create', (req, res) => {
  res.render('adduser');
});

app.post('/users/create', async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  newsletter === 'on' ? (newsletter = true) : (newsletter = false);

  console.log(req.body);

  await User.create({ name, occupation, newsletter });

  res.redirect('/');
});

conn
  .sync()
  .then(() => {
    console.log('API started!');
    app.listen(3000);
  })
  .catch((err) => console.log(err));
