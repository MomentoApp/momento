const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const session = require('express-session');
const routes = require('./routes');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api', routes);

app.listen(port, () => {
  console.log(`Connected to ${host}:${port}`);
});
