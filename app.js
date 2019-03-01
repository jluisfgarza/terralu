const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');
const {router : productsRouter} = require('./routes/productsRouter');
const {PORT, DATABASE_URL} = require('./config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./models/usersModel');

const app = express();

const mongoose =  require('mongoose');
mongoose.Promise = global.Promise;

const products = [];

app.use(express.static('public'));
app.use('/api/', productsRouter);
app.use(bodyParser.json());

// app.get('/', (req, res, next) => {
//   res.send('Hello World');
// })

app.use('/graphiql', graphqlHttp({
  schema: buildSchema(`
    type Product {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      inStock: Int!
      numbBought: Int!
    }

    type RootQuery {
      products: [Product!]!
    }

    input ProductInput {
      title: String!,
      description: String!,
      price: Float!,
      inStock: Int!,
      numBought: Int!
    }

    type RootMutation {
      createProduct(productInput: ProductInput): Product
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    products: () => {
      return products;
    },
    createProduct: (args) => {
      const product = {
        _id: Math.random().toString(),
        title: args.productInput.title,
        description: args.productInput.description,
        price: +args.productInput.price,
        inStock: args.productInput.inStock,
        numbBought: args.productInput.numbBought
      }
      products.push(product);
      return product;
    }
  },
  graphiql: true
}));

//Auth
passport.use(new LocalStrategy(
  function(username, password, done) {
    Users.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
//Auth


// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };