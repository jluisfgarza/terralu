const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema} = require('graphql');

const app = express();

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

app.listen(3000);