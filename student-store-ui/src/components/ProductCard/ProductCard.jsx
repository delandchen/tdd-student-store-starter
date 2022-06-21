import * as React from "react"
import "./ProductCard.css"
import { Link } from "react-router-dom"

export default function ProductCard(props, { showDescription = false }) {
    return (
        <div className="product-card" key={props.id} onClick={props.handleDisplayItemOnClick}>
            <Link to={"/products/" + props.id}>
                <div className="image">
                    <img src={props.imgSrc}></img>
                </div>
            </Link>
            <div className="description">
                <Link to={"/products/" + props.id} style={{ textDecoration: 'none' }}>
                    <h1 className="product-name"> {props.name}</h1>
                </Link>
                <h2 className="product-price"> ${props.price} </h2>
            </div>

        </div>
    )
}