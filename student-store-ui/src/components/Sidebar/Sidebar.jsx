import * as React from "react"
import "./Sidebar.css"
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import CheckoutForm from "../CheckoutForm/CheckoutForm"

export default function Sidebar({ checkedOut, checkoutForm, fetchSpecificItem, isOpen, shoppingCart, products, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm, handleOnToggle }) {
  return (
    <section className="sidebar">
      <div className="content">
        <i className="toggle-button material-icons md-48" onClick={handleOnToggle}> arrow_forward </i>
        <div className="sidebar-content">
          {(isOpen) ? <ShoppingCart products={products} fetchSpecificItem={fetchSpecificItem} shoppingCart={shoppingCart} /> : null}
          {(isOpen) ? <CheckoutForm checkedOut={checkedOut} checkoutForm={checkoutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} /> : null}
        </div>
        {/* <i class="material-icons md-48"> shopping_cart_checkout </i> */}
      </div>
    </section>
  )
}
