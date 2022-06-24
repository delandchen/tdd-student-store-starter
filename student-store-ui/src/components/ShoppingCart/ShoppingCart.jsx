import * as React from 'react'
import "./ShoppingCart.css"

export default function ShoppingCart({ fetchSpecificItem, isOpen, products, shoppingCart }) {
    return (
        <div className="shopping-cart">
            <ul>
                {shoppingCart.map((item) => {
                    let name;
                    for (let i = 0; i < products.length; i++) {
                        if (item.itemId == products[i].id) {
                            name = products[i].name;
                        }
                    }
                    return (
                        <li key={item.itemId}> {name} : {item.quantity}x</li>
                    )
                })}
            </ul>
        </div >
    )
}