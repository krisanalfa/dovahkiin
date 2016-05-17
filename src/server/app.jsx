import path from 'path';
import express from 'express';
import routes from './routes/index.js';

const app = express();
const config = {
  port: 3000,
  delimiters: '{!! !!}',
};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.locals.delimiters = config.delimiters;

app.use(express.static(__dirname+'/static'));

app.use('/', routes);

app.listen(config.port, () => {
  console.log('Dovahkiin served at http://127.0.0.1:'+config.port+'/');
});
