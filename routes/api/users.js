const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/usersModel");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        telephone: req.body.telephone,
        address: req.body.address,
        type: 'customer',
        orders: [],
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const {
    errors,
    isValid
  } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({
    email
  }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        emailnotfound: "Email not found"
      });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          telephone: user.telephone,
          address: user.address,
          date: user.date,
          type: user.type,
          orders: user.orders
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey, {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({
            passwordincorrect: "Password incorrect"
          });
      }
    });
  });
});

router.get('', jsonParser, (req, res) => {
  let promise = new Promise(function (resolve, reject) {
        User.find({}).select('name email address telephone orders').then(function (users) {
          res.send(users);
        });
      })
      .then(products => {
          res.json(products);
      })
      .catch(err => {
          return res.status(500).json(err);
      })
});


// TODO
// router.get('', jsonParser, (req, res) => {
//   let promise = new Promise(function (resolve, reject) {
//       User.get(resolve, reject);
//     })
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => {
//       return res.status(500).json(err);
//     })
// });

module.exports = router;