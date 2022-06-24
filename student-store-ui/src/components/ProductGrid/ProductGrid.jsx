import * as React from "react"
import "./ProductGrid.css"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductGrid({ handleAddItemToCart, handleRemoveItemFromCart, handleDisplayItemOnClick, products }) {
    return (
        <div id="buy" className="product-grid">
            <div className="content">
                {products.map((item) => (
                    <ProductCard handleRemoveItemFromCart={() => handleRemoveItemFromCart(item.id)} handleAddItemToCart={() => handleAddItemToCart(item.id)}
                        handleDisplayItemOnClick={() => handleDisplayItemOnClick(item.id)} imgSrc={item.image} id={item.id} price={item.price} name={item.name} />
                ))}
            </div>
        </div>
    )
}
