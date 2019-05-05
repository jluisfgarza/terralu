const mongoose = require('mongoose');

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(
    db, {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
