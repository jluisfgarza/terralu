const express = require('express');
const bodyParser = require('body-parser');
const passport = require("passport");
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const path = require("path");

app.use(cors());
// configure body parser for AJAX requests, Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/files', express.static(path.join(__dirname, 'public/files')))
app.get("files/:image_path", (req, res) => {
  res.sendFile(req.image_path);
});

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
