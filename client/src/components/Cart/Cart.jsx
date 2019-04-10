import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkout } from "../../actions/cartActions";
import { getTotal, getCartProducts } from "../../reducers";

const Cart = props => {
  const hasProducts = props.products.length > 0;
  const nodes = hasProducts ? (
    props.products.map(product => (
      <div key={product.id}>
        {product.title} - &#36;{product.price}
        {product.quantity ? ` x ${product.quantity}` : null}
      </div>
    ))
  ) : (
    <em>Please add some products to cart.</em>
  );

  return (
    <div>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <p>Total: &#36;{props.total}</p>
      <button
        onClick={checkout(props.products)}
        disabled={hasProducts ? "" : "disabled"}
      >
        Checkout
      </button>
    </div>
  );
};

Cart.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: getCartProducts(state),
  total: getTotal(state)
});

export default connect(
  mapStateToProps,
  { checkout }
)(Cart);
