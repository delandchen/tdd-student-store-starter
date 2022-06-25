import * as React from 'react'
import "./ShoppingCart.css"

export default function ShoppingCart({ fetchSpecificItem, isOpen, products, shoppingCart }) {
    const calculateTotal = () => {
        let total = 0;

        shoppingCart.map((item) => {
            for (let i = 0; i < products.length; i++) {
                if (item.itemId == products[i].id) {
                    total += products[i].price * item.quantity;
                }
            }
        })

        return total;
    }

    return (
        <div className="shopping-cart">
            <ul>
                {shoppingCart.map((item) => {
                    let name;
                    let price;
                    for (let i = 0; i < products.length; i++) {
                        if (item.itemId == products[i].id) {
                            name = products[i].name;
                            price == products[i].price;
                        }
                    }
                    return (
                        <li key={item.itemId}> {name} : {item.quantity} x {price} </li>
                    )
                })}
            </ul>
            <h3> Total =    {(calculateTotal() * 1.0875).toPrecision(3)}    ({calculateTotal().toPrecision(3)}  +  8.75% tax) </h3>
        </div >
    )
}