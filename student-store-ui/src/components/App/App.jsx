import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import Footer from "../Footer/Footer"
import "./App.css"
import { BrowserRouter } from "react-router-dom"
import ProductDetail from "../ProductDetail/ProductDetail"
import PropTypes from 'prop-types';
import axios from 'axios';

export default function App() {
  const [products, setProducts] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [shoppingCart, setShoppingCart] = React.useState([]);

  App.PropTypes = {
    products: PropTypes.array,
  }

  // API to get store items
  const fetchItems = async () => {
    await axios.get("https://codepath-store-api.herokuapp.com/store").then((res) => {
      const data = res.data.products;
      setProducts([...data]);
    }).catch((err) => {  // If there is an error, setError and log it
      setError(err.response);
      console.log(err.response);
    });
  }

  // If the App component mounted, then fetch array of store objects
  React.useEffect(() => {
    fetchItems();
    console.log(products);
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Navbar />
          <Sidebar />
          <Home products={products} />
          <ProductDetail />
          <Footer />
        </main>
      </BrowserRouter>
    </div>
  )
}
