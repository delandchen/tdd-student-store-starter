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
    fetchCategorizedItems(category);
  }

  // For toggling sidebar
  const handleOnToggle = () => {

  }

  // For adding to cart
  const handleAddItemToCart = (productId) => {
    // If product exists in shopping cart, increment. Else set to 1
  }

  // For removing from cart
  const handleRemoveItemFromCart = (productId) => {

  }

  // name is attribute of the input being updated, value is the new value for the input
  const handleOnCheckoutFormChange = (name, value) => {

  }

  // API post to purchase in db.json
  const handleOnSubmitCheckoutForm = () => {

  }

  // API Calls //

  // Fetches API data and filters based on search term
  const fetchSearchedItems = async () => {
    const data = await axios.get("http://localhost:3001/store").then((res) => {
      return res.data.products;
    }).catch((err) => {  // If there is an error, setError and log it
      setError(err.response);
      console.log(err.response);
    });

    const searched = [];

    if (searchTerm) {
      data.forEach((item) => {
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          searched.push(item);
        }
      })

      setProducts(searched);
    }
    else {
      setProducts(data);
    }
  }

  // Fetches API data and filters based on category
  const fetchCategorizedItems = async (category) => {
    const data = await axios.get("http://localhost:3001/store").then((res) => {
      return res.data.products;
    }).catch((err) => {  // If there is an error, setError and log it
      setError(err.response);
      console.log("error is: " + err.response);
    });

    const categorized = [];

    data.forEach((item) => {
      if (item.category == category) {
        categorized.push(item);
      }
    })

    setProducts(categorized);
  }

  const fetchSpecificItem = async (id) => {
    await axios.get("http://localhost:3001/store/" + id).then((res) => {
      const data = res.data.product;
      setItem(data);
    }).catch((err) => {  // If there is an error, setError and log it
      setError(err.response);
      console.log("error is: " + err.response);
    });
  }

  // API to get ALL items
  const fetchItems = async () => {
    await axios.get("http://localhost:3001/store").then((res) => {
      const data = res.data.products;
      setProducts([...data]);
    }).catch((err) => {  // If there is an error, setError and log it
      setError(err.response);
      console.log("error is: " + err.response);
    });
  }

  // If the App component mounted, then fetch array of store objects
  React.useEffect(() => {
    fetchItems();
    console.log("product is: " + products);
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Navbar />
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} shoppingCart={shoppingCart} products={products}
            handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
            handleOnToggle={handleOnToggle} />
          <Routes>
            <Route path="/" element={<Home products={products} handleSetSearchTerm={handleSetSearchTerm}
              handleSelectCategory={handleSelectCategory} handleDisplayItemOnClick={handleDisplayItemOnClick} fetchItems={fetchItems}
              handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart} />}></Route>
            {products.map((obj) => (<Route path={"/products/" + obj.id} element={<ProductDetail item={obj} />}> </Route>))}
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </div>
  )
}
