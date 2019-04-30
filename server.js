const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const users = require("./routes/api/users");
const products = require("./routes/api/products");
const orders = require("./routes/api/orders");
const multer = require("multer")

const app = express();

app.use(express.static('client/public/images'));

var upload = multer({
  storage: multer.diskStorage({
    destination: 'client/public/images',
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
 

// Body Parser Middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").MONGO_URI;
const localdb = require("./config/keys").LOCALDATABASE;
const port = require("./config/keys").PORT;

// Connect to MongoDB
mongoose
  .connect(
    db, {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/", products);
app.use("/api", orders);

app.listen(port, () => console.log(`Server up and running on port ${port} !`))
