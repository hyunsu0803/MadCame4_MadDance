const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const api = require('./routes/index');
const board1Router = require('./routes/board1');
const board2Router = require('./routes/board2');
const board3Router = require('./routes/board3');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/api', api);
app.use('/board1', board1Router);
app.use('/board2', board2Router);
app.use('/board3', board3Router);

const port = 80;
app.listen(port, () => console.log(`Listening on port ${port}`));
