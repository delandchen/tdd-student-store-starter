import * as React from "react"
import "./Home.css"

export default function Home(props) {
  return (
    <div className="home">
      <div className="home-navbar">
        <div className="categories">
          <p> All Categories </p>
          <p> Clothing </p>
          <p> Food </p>
          <p> Accessories </p>
          <p> Tech </p>
        </div>
      </div>
      <div className="product-grid">
        <div className="content">
          {props.products.map((item) => (
            <ItemCard imgSrc={item.image} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  )
}


export function ItemCard(props) {
  return (
    <div className="item-card" key={props.id}>
      <img src={props.imgSrc}></img>
    </div>
  );
}
