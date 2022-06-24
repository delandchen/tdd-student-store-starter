import * as React from 'react'
import "./CheckoutForm.css"

export default function CheckoutForm({ checkedOut, isOpen, checkoutForm, ShoppingCart, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm }) {
    return (
        <div className="checkout-form">
            <input className="checkout-form-input" type="email" name="email" placeholder="student@codepath.org" value={checkoutForm.email} onChange={handleOnCheckoutFormChange}></input>
            <input className="checkout-form-input" type="text" name="name" placeholder='Student Name' value={checkoutForm.name} onChange={handleOnCheckoutFormChange}></input>
            <button className="checkout-button" onClick={handleOnSubmitCheckoutForm} > Checkout </button>
            {(checkedOut) ? <h1 className="success"> Success! </h1> : null}
        </div >
    )
}