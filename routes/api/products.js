const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Products = require('../../models/productsModel');
const cors = require('cors')

let jsonParser = bodyParser.json();

router.get('', cors(), jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Products.get(resolve, reject);
        })
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        })
});

router.get('/:_id', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Products.getOne(resolve, reject, req.params._id);
        })
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.post('', jsonParser, (req, res) => {
    const requiredFields = ["title", "description", "price", "inStock", "numBought", "image", "photos"];
    for (let i = 0; i < requiredFields.length; i++) {
        if (!(requiredFields[i] in req.body)) {
            console.log(`Missing field ${requiredFields[i]}`);
            return res.status(400).send(`Missing field ${requiredFields[i]}`);
        }
    }
    let promise = new Promise(function (resolve, reject) {
        Products.create(resolve, reject, {
            _id: req.body._id,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            inStock: req.body.inStock,
            numBought: req.body.numBought,
            image: req.body.image,
            photos: req.body.photos,
        });
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        return res.status(400).send(`Something unexpected occured ${err}`);
    });
});

router.put('/:_id', jsonParser, (req, res) => {
    let idParam = req.params._id;
    let idBody = req.body._id;
    if (idParam && idBody && idParam == idBody) {
        let promise = new Promise(function (resolve, reject) {
            let updatedProduct = {
                _id: idBody,
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                inStock: req.body.inStock,
                numBought: req.body.numBought,
                image: req.body.image,
                photos: req.body.photos,
            }
            Products.update(resolve, reject, idBody, updatedProduct);
        }).then(result => {
            res.status(204).end();
        }).catch(err => {
            return res.status(500).json(err);
        });

    } else {
        return res.status(400).json({
            err: "Id does not coincide with body"
        });
    }
});

router.put('/updateStockBought/:_id', jsonParser, (req, res) => {
    let idParam = req.params._id;
    let idBody = req.body._id;
    if (idParam && idBody && idParam == idBody) {
        let promise = new Promise(function (resolve, reject) {
            let updatedProduct = {
                _id: idBody,
                inStock: req.body.inStock,
                numBought: req.body.numBought,
            }
            Products.update(resolve, reject, idBody, updatedProduct);
        }).then(result => {
            res.status(204).end();
        }).catch(err => {
            return res.status(500).json(err);
        });

    } else {
        return res.status(400).json({
            err: "Id does not coincide with body"
        });
    }
});

router.delete('/:_id', jsonParser, (req, res) => {
    if (req.params._id == req.body._id) {
        let promise = new Promise(function (resolve, reject) {
            Products.delete(resolve, reject, req.body._id);
        }).then(result => {
            res.status(204).end();
        }).catch(err => {
            return res.status(400).send('Id not found in Products');
        });
    } else {
        return res.status(400).send('Parameter does not coincide with body');
    }
});

module.exports = router;