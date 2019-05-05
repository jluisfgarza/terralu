const router = require('express').Router();
const users = require("./api/users");
const products = require("./api/products");
const orders = require("./api/orders");
const path = require('path');

// API routes
router.use("/api/users", users);
router.use("/api/", products);
router.use("/api/", orders);

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;