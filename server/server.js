const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});