const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const {ListProducts} = require('./../models/productsModel');

let jsonParser = bodyParser.json();

router.get('/list-products', jsonParser, (req, res) => {
    let promise = new Promise(function(resolve, reject){
        ListProducts.get(resolve, reject);
    })
    .then(listProducts => {
        res.json(listProducts);
    })
    .catch(err => {
        return res.status(500).json(err);
    })
});

router.post('/list-products', jsonParser, (req, res) => {
    console.log(req.body);
    const requiredFields = ["title", "description", "price", "inStock", "numbBought", "id"];
    for(let i = 0; i < requiredFields.length; i++){
        if (!(requiredFields[i] in req.body)){
            console.log(`Missing field ${requiredFields[i]}`);
            return res.status(400).send(`Missing field ${requiredFields[i]}`);
        }
    }
    let promise = new Promise(function(resolve, reject){
        ListProducts.create(resolve, reject, {
            id : req.body.id,
            title : req.body.title,
            description : req.body.description,
            price : req.body.price,
            inStock : req.body.inStock,
            numbBought : req.body.numbBought,
        });
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        return res.status(400).send(`Something unexpected occured ${err}`);
    });
});


module.exports = {
    router
};

