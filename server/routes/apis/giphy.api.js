const axios = require('axios');
const express = require('express');
const router = express.Router();



router.get('/search', (req, res) => {
    console.log('here');
    const config = {
        params: {
            api_key: process.env.GIPHY_API_KEY,
            q: 'cows'
        }
    }
    axios.get('https://api.giphy.com/v1/gifs/search', config)
        .then(response => {
        //   self.pagination = response.data.pagination.offset;
        //   self.count = response.data.pagination.count;
            res.send(response);
        })
        .catch(error => {
            res.sendStatus(500);
        });
});


router.get('/random', (req, res) => {
    console.log('here in random');

    console.log('api key', process.env.GIPHY_API_KEY);
    axios.get('https://api.giphy.com/v1/gifs/random?api_key=' + process.env.GIPHY_API_KEY)
        .then(function(response){
            // self.answers.url = response.data.data.image_url;
            // console.log('response from service', self.answers.url);
            console.log('RESPONSE', response.data);
            res.send(response.data);
        })
        .catch(function(error) {
            console.log('is there an error', error);
            res.sendStatus(500);
        });
    

});

module.exports = router;