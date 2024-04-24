const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/account', require('./controllers/account.controller'));
app.use('/premium', require('./controllers/premium.controller'));
app.use('/code', require('./controllers/code.controller'));


app.listen(PORT, async () => {
  console.log(`Listening on the port ${PORT}`);
});