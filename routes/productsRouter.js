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

router.get('/list-products/:_id', jsonParser, (req, res) => {
    let promise = new Promise(function(resolve, reject){
        console.log(req.params._id);
        ListProducts.getOne(resolve, reject, req.params._id);
    })
    .then(listProducts => {
        res.json(listProducts);
    })
    .catch(err => {
        return res.status(500).json(err);
    })
});

router.post('/list-products', jsonParser, (req, res) => {
    const requiredFields = ["title", "description", "price", "inStock", "numbBought", "_id"];
    for(let i = 0; i < requiredFields.length; i++){
        if (!(requiredFields[i] in req.body)){
            console.log(`Missing field ${requiredFields[i]}`);
            return res.status(400).send(`Missing field ${requiredFields[i]}`);
        }
    }
    let promise = new Promise(function(resolve, reject){
        ListProducts.create(resolve, reject, {
            _id : req.body._id,
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

router.put('/list-products/:_id', jsonParser, (req, res) => {
    let idParam = req.params._id;
    let idBody = req.body._id;
    console.log(idParam);
    console.log(idBody);
    if (idParam && idBody && idParam == idBody){
        let promise = new Promise(function(resolve, reject){
            let updatedProduct = {
                _id : idBody,
                title : req.body.title,
                description : req.body.description,
                price : req.body.price,
                inStock : req.body.inStock,
                numbBought : req.body.numbBought,
            }
            ListProducts.update(resolve, reject, idBody, updatedProduct);
        }).then(result=> {
            res.status(204).end();
        }).catch(err => {
            return res.status(500).json(err);
        });

    }
    else{
        return res.status(400).json({err : "Id does not coincide with body"});
    }
});

router.delete('/list-products/:_id', jsonParser, (req, res) => {
    if (req.params._id == req.body._id){
        let promise = new Promise(function(resolve, reject){
            ListProducts.delete(resolve, reject, req.body._id);
        }).then(result=> {
            res.status(204).end();
        }).catch(err => {
            return res.status(400).send('Id not found in Products');
        });
    }
    else{
        return res.status(400).send('Parameter does not coincide with body');
    }
});

module.exports = {
    router
};

