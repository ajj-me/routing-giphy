const axios = require('axios');
const express = require('express');
const router = express.Router();


router.get('/search', (req, res) => {
    console.log('here');
    const url = `https://api.giphy.com/v1/gifs/search?q=${req.query.q}&api_key=${process.env.GIPHY_API_KEY}`;
    // const config = {
    //     api_key: process.env.GIPHY_API_KEY,
    //     q: req.query
    // };
    // console.log('asdf', req.query.q);

    // console.log(url);
    axios.get(url)
        .then(function(response) {
        //   self.pagination = response.data.pagination.offset;
        //   self.count = response.data.pagination.count;
            res.send(response.data);
            console.log(response);
        })
        .catch(function(error) {
            console.log('error');
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


function queryMaker(query, params) {
    const queries = Object.keys(query);
    let queryString = 'https://api.giphy.com/' + params[0];
    if (params[1]) {
        queryString += '/' + params[1];
    }
    for (let i = 0; i < queries.length; i++) {
        if (i === 0) {
            queryString += '?';
        } else {
            queryString += '&';
        }
        queryString += queries[i] + '=' + query[queries[i]];
    }
    return queryString;
}

router.get('/:firstParam', (req, res) => {
    let queryString = queryMaker(req.query, [req.params.firstParam]);
    console.log(queryString);
    res.send(req.params);
});
router.get('/:firstParam/:secondParam', (req, res) => {
    let queryString = queryMaker(req.query, [req.params.firstParam, req.params.secondParam]);
    console.log(queryString);
    res.send(req.params);
});


module.exports = router;