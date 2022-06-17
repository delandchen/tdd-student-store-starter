import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import Footer from "../Footer/Footer"
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProductDetail from "../ProductDetail/ProductDetail"
import PropTypes from 'prop-types'
import axios from 'axios'

export default function App() {
  const [products, setProducts] = React.useState([]);
  const [item, setItem] = React.useState(null);   // Set item for product details page
  const [isFetching, setIsFetching] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [shoppingCart, setShoppingCart] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");


  const handleDisplayItemOnClick = (item) => {
    setItem(item);
  }

  const handleSetSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchedItems();
  }

  const handleSelectCategory = (category) => {
    fetchSpecificItems(category);
  }

  const fetchSearchedItems = async () => {
    const data = await axios.get("https://codepath-store-api.herokuapp.com/store").then((res) => {
      return res.data.products;
    }).catch((err) => {  // If there is an error, setError and log it
      setError(err.response);
      console.log(err.response);
    });

    const searched = [];

    data.forEach((item) => {
      if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        searched.push(item);
      }
    })

    setProducts(searched);
  }


  const fetchSpecificItems = async (category) => {
    const data = await axios.get("https://codepath-store-api.herokuapp.com/store").then((res) => {
      return res.data.products;
    }).catch((err) => {  // If there is an error, setError and log it
      setError(err.response);
      console.log(err.response);
    });

    const categorized = [];

    data.forEach((item) => {
      if (item.category == category) {
        categorized.push(item);
      }
    })

    setProducts(categorized);
  }


  // API to get all items
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
          <Routes>
            <Route path="/" element={<Home products={products} handleSetSearchTerm={handleSetSearchTerm}
              handleSelectCategory={handleSelectCategory} handleDisplayItemOnClick={handleDisplayItemOnClick} fetchItems={fetchItems} />}> </Route>
            <Route path="details" element={<ProductDetail item={item} />}> </Route>
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </div>
  )
}
