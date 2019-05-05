const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Orders = require('../../models/ordersModel');

let jsonParser = bodyParser.json();

// Nodemailer
const nodemailer = require('nodemailer');
const trans = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.N_EMAIL,
        pass: process.env.N_PASSWORD
    }
}
const transporter = nodemailer.createTransport(trans);

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        // console.log('Server is ready to send new orders emails');
    }
});

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
    const requiredFields = ["username", "address", "products", "total", "paypalId"];
    for (let i = 0; i < requiredFields.length; i++) {
        if (!(requiredFields[i] in req.body)) {
            return res.status(400).send(`Missing field ${requiredFields[i]}`);
        }
    }
    let promise = new Promise(function (resolve, reject) {
        Orders.create(resolve, reject, {
            username: req.body.username,
            address: req.body.address,
            products: req.body.products,
            total: req.body.total,
            paypalId: req.body.paypalId,
        });
    }).then(result => {
        console.log(req.body.userEmail);
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
                username: req.body.username,
                address: req.body.address,
                products: req.body.products,
                total: req.body.total,
                paypalId: req.body.paypalId,
            }
            Orders.update(resolve, reject, idBody, updatedOrder);
        }).then(result => {
            console.log(req.body.userEmail);
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