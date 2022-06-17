import * as React from "react"
import "./Home.css"
import { Link } from "react-router-dom"

export default function Home(props) {
  return (
    <div className="home">
      <div className="banner">
        <div className="content">
          <h1> Welcome,</h1>
          <p> Buy Something or Die</p>
        </div>
      </div>
      <div className="home-navbar">
        <div className="search">
          <form id="search-form">
            <input onChange={props.handleSetSearchTerm} id="search-bar" type="text" placeholder="Search for an item...">
            </input>
          </form>
        </div>
        <div className="categories">
          <h2 onClick={() => props.fetchItems()}> All Categories </h2>
          <h2 onClick={() => props.handleSelectCategory("clothing")}> Clothing </h2>
          <h2 onClick={() => props.handleSelectCategory("food")}> Food </h2>
          <h2 onClick={() => props.handleSelectCategory("accessories")}> Accessories </h2>
          <h2 onClick={() => props.handleSelectCategory("tech")}> Tech </h2>

        </div>
      </div>
      <div id="buy" className="product-grid">
        <div className="content">
          {props.products.map((item) => (
            <ItemCard handleDisplayItemOnClick={() => props.handleDisplayItemOnClick(item)} imgSrc={item.image} key={item.id} price={item.price} name={item.name} />
          ))}
        </div>
      </div>
      <div id="about" className="about">
        <div class="content">
          <div class="summary">
            <div class="text">
              <h3>About</h3>
              <p>The codepath student store offers great products at great prices from a great team and for a great cause.</p>
              <p>We've searched far and wide for items that perk the interests of even the most eccentric students and decided to offer them all here in one place.</p><p>All proceeds go towards bringing high quality CS education to college students around the country.</p>
            </div><div class="media">
            </div>
          </div>
        </div>
      </div>
      <div id="contact" className="contact">
        <div className="content">
          <div className="summary">
            <ul className="info">
              <h3>Contact Us</h3>
              <li><span className="label">Email:</span><span>code@path.org</span></li>
              <li><span className="label">Phone:</span><span>1-800-CODEPATH</span></li>
              <li><span className="label">Address:</span><span>123 Fake Street, San Francisco, CA</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


export function ItemCard(props) {
  return (
    <div className="item-card" key={props.id} onClick={props.handleDisplayItemOnClick}>
      <Link to="/details">
        <div className="image">
          <img src={props.imgSrc}></img>
        </div>
      </Link>
      <div className="description">
        <Link to="/details">
          <h1 id="name"> {props.name}</h1>
        </Link>
        <h2 id="price"> ${props.price} </h2>
      </div>

    </div>

  );
}
