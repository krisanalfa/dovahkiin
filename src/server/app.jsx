import path from 'path';
import express from 'express';
import routes from './routes/index.js';
import mustacheExpress from 'mustache-express';

const app = express();

app.engine('mustache', mustacheExpress());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use('/', routes);

app.listen(3000, () => {
  console.log('Dovahkiin served at http://127.0.0.1:3000/');
});
