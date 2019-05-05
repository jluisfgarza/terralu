const express = require('express');
const bodyParser = require('body-parser');
const passport = require("passport");
const multer = require("multer");
const app = express();
const  routes = require('./routes');
const PORT = process.env.PORT || 5000;

// configure body parser for AJAX requests, Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Client app folders
app.use(express.static('client/public/images/'));


var upload = multer({
  storage: multer.diskStorage({
    destination: 'client/public/images/products',
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
  })
})

app.post('/uploadfile', upload.single('image'), (req, res, next) => {
  const file = req.file
  console.log(file);
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)
})

// require db connection
require('./models');

// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

app.use(express.static('client/build'));
app.use(routes);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});
