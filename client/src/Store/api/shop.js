/**
 * Mocking client-server processing
 */
// import _products from './products.json'
import axios from "axios";

const TIMEOUT = 10000

var products = null;
axios
  .get("/api/products")
  .then(res => { products = res.data })
  .catch(error => { alert("Could not fetch Products"); });

export default {
  // getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
  getProducts: (cb, timeout) => setTimeout(() => cb(products), timeout || TIMEOUT),
  // buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
