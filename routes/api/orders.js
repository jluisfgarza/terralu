const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Orders = require('../../models/ordersModel');

let jsonParser = bodyParser.json();

router.get('/orders', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Orders.get(resolve, reject);
        })
        .then(orders => {
            res.json(orders);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.get('/orders/:_id', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Orders.getOne(resolve, reject, req.params._id);
        })
        .then(orders => {
            res.json(orders);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.post('/orders/ids', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Orders.getByIds(resolve, reject, req.body.OrderIds);
        })
        .then(orders => {
            res.json(orders);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.post('/orders', jsonParser, (req, res) => {
    const requiredFields = ["products", "price"];
    for (let i = 0; i < requiredFields.length; i++) {
        if (!(requiredFields[i] in req.body)) {
            return res.status(400).send(`Missing field ${requiredFields[i]}`);
        }
    }
    let promise = new Promise(function (resolve, reject) {
        Orders.create(resolve, reject, {
            _id: req.body._id,
            products: req.body.products,
            price: req.body.price,
        });
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        return res.status(400).send(`Something unexpected occured ${err}`);
    });
});

router.put('/orders/:_id', jsonParser, (req, res) => {
    let idParam = req.params._id;
    let idBody = req.body._id;
    if (idParam && idBody && idParam == idBody) {
        let promise = new Promise(function (resolve, reject) {
            let updatedOrder = {
                _id: idBody,
                products: req.body.products,
                price: req.body.price,
            }
            Orders.update(resolve, reject, idBody, updatedOrder);
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

router.delete('/orders/:_id', jsonParser, (req, res) => {
    if (req.params._id == req.body._id) {
        let promise = new Promise(function (resolve, reject) {
            Orders.delete(resolve, reject, req.body._id);
        }).then(result => {
            res.status(204).end();
        }).catch(err => {
            return res.status(400).send('Id not found in Orders');
        });
    } else {
        return res.status(400).send('Parameter does not coincide with body');
    }
});

module.exports = router;