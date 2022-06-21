import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import Footer from "../Footer/Footer"
import NotFound from "../NotFound/NotFound"
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

  // Handlers //

  // Sets item to display on ProductDetails component
  const handleDisplayItemOnClick = (item) => {
    setItem(item);
  }

  // Sets the search term state
  const handleSetSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchedItems();
  }

  // Calls the function that fetches API data and filters it for display based on the category
  const handleSelectCategory = (category) => {
    fetchSpecificItems(category);
  }

  // API Calls //

  // Fetches API data and filters based on search term
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

  // Fetches API data and filters based on category
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

  // API to get ALL items
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
            {products.map((obj) => (<Route path={"/products/" + obj.id} element={<ProductDetail item={obj} />}> </Route>))}
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </div>
  )
}
