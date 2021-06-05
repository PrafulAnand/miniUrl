const express = require('express');
const app = express();
const urls = require('./routes/urls.js');
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('public'));

app.use('/urls', urls);

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`)
});