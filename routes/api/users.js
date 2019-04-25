require('dotenv').config();

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

// Nodemailer
const nodemailer = require('nodemailer');
const trans = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'terralumx@gmail.com',
    pass: process.env.PASSWORD
  }
}
const transporter = nodemailer.createTransport(trans);  

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

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
            .then(
              user => {
                res.json(user);
                transporter.sendMail({
                  from: 'terralumx@gmail.com', // sender address
                  to: user.email, // list of receivers
                  subject: 'Terralu - Usuario Registrado', // Subject line
                  // html: `<p> Hola ` + user.name + ` esta es una confirmación de tu registro en Terralu.
                  //   </br> Correo: ` + user.email + `</p>`// plain text body
                  html: `<table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
                  style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"
                  valign="top" width="100%">
                  <tbody>
                    <tr style="vertical-align: top;" valign="top">
                      <td style="word-break: break-word; vertical-align: top; border-collapse: collapse;" valign="top">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
                        <div style="background-color:transparent;">
                          <div class="block-grid"
                            style="Margin: 0 auto; min-width: 320px; max-width: 480px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
                            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:480px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                              <!--[if (mso)|(IE)]><td align="center" width="480" style="background-color:transparent;width:480px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                              <div class="col num12"
                                style="min-width: 320px; max-width: 480px; display: table-cell; vertical-align: top;;">
                                <div style="width:100% !important;">
                                  <!--[if (!mso)&(!IE)]><!-->
                                  <div
                                    style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                    <!--<![endif]-->
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                                    <div
                                      style="color:#555555;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                      <div
                                        style="font-size: 12px; line-height: 14px; color: #555555; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                                        <p style="font-size: 12px; line-height: 14px; margin: 0;"><br></p>
                                      </div>
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                    <div align="center" class="img-container center autowidth"
                                      style="padding-right: 0px;padding-left: 0px;">
                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img
                                        align="center" alt="Image" border="0" class="center autowidth" src="https://scontent.fmfe1-1.fna.fbcdn.net/v/t1.0-9/48370807_332657967571360_1966916694525870080_n.jpg?_nc_cat=100&_nc_ht=scontent.fmfe1-1.fna&oh=81b62f09af9c8b4ee3fe734236fe8e88&oe=5D3D57FB"
                                        style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; border: 0; height: auto; float: none; width: 100%; max-width: 360px; display: block;"
                                        title="Image" width="360">
                                      <!--[if mso]></td></tr></table><![endif]-->
                                    </div>
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 15px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                                    <div
                                      style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:30px;padding-right:30px;padding-bottom:15px;padding-left:30px;">
                                      <div
                                        style="font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 12px; line-height: 14px; color: #555555;">
                                        <p style="font-size: 12px; line-height: 21px; text-align: center; margin: 0;"><span
                                            style="font-size: 18px;"><strong>Benvenido@</strong> ` + user.name + `</span> </br> Correo: ` + user.email + `</p>
                                      </div>
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 0px; padding-bottom: 5px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                                    <div
                                      style="color:#388e3c;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:0px;padding-right:0px;padding-bottom:5px;padding-left:0px;">
                                      <div
                                        style="font-size: 12px; line-height: 14px; color: #388e3c; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;">
                                        <p style="font-size: 12px; line-height: 21px; text-align: center; margin: 0;"><span
                                            style="font-size: 18px;"><strong><span style="line-height: 21px; font-size: 18px;">Gracias
                                                por Registrarte</span></strong></span></p>
                                      </div>
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 30px; font-family: Arial, sans-serif"><![endif]-->
                                    <div
                                      style="color:#989898;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:30px;padding-left:10px;">
                                      <div
                                        style="font-size: 12px; line-height: 14px; color: #989898; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                                        <p style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;">Para conocer
                                          nuestros productos por favor visita: [link]</p>
                                      </div>
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                    <!--[if (!mso)&(!IE)]><!-->
                                  </div>
                                  <!--<![endif]-->
                                </div>
                              </div>
                              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                            </div>
                          </div>
                        </div>
                        <div style="background-color:#388e3c;">
                          <div class="block-grid"
                            style="Margin: 0 auto; min-width: 320px; max-width: 480px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
                            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#388e3c;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:480px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                              <!--[if (mso)|(IE)]><td align="center" width="480" style="background-color:transparent;width:480px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                              <div class="col num12"
                                style="min-width: 320px; max-width: 480px; display: table-cell; vertical-align: top;;">
                                <div style="width:100% !important;">
                                  <!--[if (!mso)&(!IE)]><!-->
                                  <div
                                    style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                    <!--<![endif]-->
                                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation"
                                      style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                      valign="top" width="100%">
                                      <tbody>
                                        <tr style="vertical-align: top;" valign="top">
                                          <td class="divider_inner"
                                            style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-collapse: collapse;"
                                            valign="top">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content"
                                              role="presentation"
                                              style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 0px solid transparent;"
                                              valign="top" width="100%">
                                              <tbody>
                                                <tr style="vertical-align: top;" valign="top">
                                                  <td
                                                    style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;"
                                                    valign="top"><span></span></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (!mso)&(!IE)]><!-->
                                  </div>
                                  <!--<![endif]-->
                                </div>
                              </div>
                              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                            </div>
                          </div>
                        </div>
                
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>`
                  }, (err, info) => {
                  console.log(info.envelope);
                  console.log(info.messageId);
                });
              }
            )
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