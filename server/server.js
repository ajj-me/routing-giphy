const express = require('express');
const app = express();
let port = process.env.PORT || 3000;

const env = require('dotenv');
const giphyRoute = require('./routes/apis/giphy.api');

env.config();

app.use(express.static('server/public'));

app.use('/giphy', giphyRoute);

app.listen(port, () => {
    console.log(`server running on ${port}`);
});