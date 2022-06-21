import * as React from "react"
import "./ProductDetail.css"

export default function ProductDetail(props) {
    const [product, setProduct] = React.useState(null);
    return (
        <div className="product-detail">
            <div className="image">
                <img src={props.item.image}></img>
            </div>
            <div className="details">
                <h2 id="name"> {props.item.name} </h2>
                <p id="description"> {props.item.description} </p>
                <h2> ${props.item.price} </h2>
            </div>
        </div>
    )
}