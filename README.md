# Test Graphql

`http://localhost:3000/graphiql`

```
query {
  products {
  _id
  title
  price
  }
}
```

```
mutation {
  createProduct(
    productInput: {
      title: "Suculenta",
      description: "Planta 1",
      price: 9.99,
      inStock: 10,
      numBought: 0
    }
  ) {
    title
  }
}
```
