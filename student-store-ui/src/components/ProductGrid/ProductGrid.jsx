import * as React from "react"
import "./ProductGrid.css"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductGrid(props) {
    return (
        <div id="buy" className="product-grid">
            <div className="content">
                {props.products.map((item) => (
                    <ProductCard handleRemoveItemFromCart={props.handleRemoveItemFromCart} handleAddItemToCart={props.handleAddItemToCart}
                        handleDisplayItemOnClick={() => props.handleDisplayItemOnClick(item)} imgSrc={item.image} id={item.id} price={item.price} name={item.name} />
                ))}
            </div>
        </div>
    )
}
