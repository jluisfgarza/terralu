const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema} = require('graphql');
const {router : productsRouter} = require('./routes/productsRouter');
const {PORT, DATABASE_URL} = require('./config');

const app = express();

const mongoose =  require('mongoose');
mongoose.Promise = global.Promise;

const products = [];

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

app.use(express.static('public'));
app.use('/api/', productsRouter);

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

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
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

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };