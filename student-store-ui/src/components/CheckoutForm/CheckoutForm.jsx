import * as React from 'react'
import "./CheckoutForm.css"

export default function CheckoutForm({ error, checkedOut, isOpen, checkoutForm, ShoppingCart, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm }) {
    return (
        <div className="checkout-form">
            <div className="input">
                <input className="checkout-form-input" type="email" name="email" placeholder="student@codepath.org" value={checkoutForm.email} onChange={handleOnCheckoutFormChange}></input>
                <input className="checkout-form-input" type="text" name="name" placeholder='Student Name' value={checkoutForm.name} onChange={handleOnCheckoutFormChange}></input>
            </div>

            <button className="checkout-button" onClick={handleOnSubmitCheckoutForm} > Checkout </button>
            {(checkedOut) ? <h2 className="success"> Success! </h2> : null}
            {(error) ? <h2 className="error"> {error} </h2> : null}
        </div >
    )
}