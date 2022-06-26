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
  const [checkoutForm, setCheckoutForm] = React.useState({ email: "", name: "" })
  const [checkedOut, setCheckedOut] = React.useState(false);
  const [receipt, setReceipt] = React.useState({});
  const [success, setSuccess] = React.useState(false);

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
    if (!isOpen) {
      setIsOpen(true);
      document.querySelector(".sidebar").classList.add("opened")
    }

    if (isOpen) {
      setIsOpen(false);
      setSuccess(false);
      document.querySelector(".sidebar").classList.remove("opened")
    }
  }

  // For adding to cart
  const handleAddItemToCart = (productId) => {
    // If product exists in shopping cart, increment. Else set to 1
    const newArr = [...shoppingCart];

    if (newArr.some(el => el.itemId == productId)) {
      newArr.forEach((el) => {
        if (el.itemId == productId) {
          el.quantity += 1;
        }
      })

      setShoppingCart(newArr);
    }
    else {
      newArr.push({ itemId: productId, quantity: 1 })
      setShoppingCart(newArr);
    }

    setCheckedOut(false);
  }

  // For removing from cart
  const handleRemoveItemFromCart = (productId) => {
    const newArr = [...shoppingCart];

    if (newArr.some(el => el.itemId == productId)) {
      newArr.forEach((el, idx) => {
        if (el.itemId == productId) {
          if (el.quantity > 1) {
            newArr[idx].quantity -= 1;
          }
          else if (el.quantity == 1) {
            newArr.splice(idx, 1);
          }
        }
      })

    }
    setShoppingCart(newArr);
  }

  // name is attribute of the input being updated, value is the new value for the input
  const handleOnCheckoutFormChange = (e) => {
    if (e.target.name == "email") {
      setCheckoutForm({ name: checkoutForm.name, email: e.target.value });
    }
    else if (e.target.name == "name") {
      setCheckoutForm({ name: e.target.value, email: checkoutForm.email });
    }

    console.log(checkoutForm);
  }

  // API post to purchase in db.json
  const handleOnSubmitCheckoutForm = async () => {
    axios.post("http://localhost:3001/store/", { user: checkoutForm, shoppingCart: shoppingCart }).then(
      (response) => {
        setReceipt(response.data.purchase.receipt);
        setShoppingCart([]);
        setCheckoutForm({ email: "", name: "" });
        setCheckedOut(true);
        setSuccess(true);
        setError(false);

      },
      (err) => {
        setError(err.response.data.error.message);
      }
    )
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

  const fetchSpecificItem = async (itemId) => {
    const data = await axios.get("http://localhost:3001/store/" + itemId).then((res) => {
      return res.data.product;
    }).catch((err) => {  // If there is an error, setError and log it
      setError(err.response);
      console.log("error is: " + err.response);
    });

    return data;
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
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Navbar />
          <Sidebar error={error} success={success} receipt={receipt} checkedOut={checkedOut} fetchSpecificItem={fetchSpecificItem} isOpen={isOpen} setIsOpen={setIsOpen} shoppingCart={shoppingCart} products={products}
            checkoutForm={checkoutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
            handleOnToggle={handleOnToggle} />
          <Routes>
            <Route path="/" element={<Home products={products} searchTerm={searchTerm} handleSetSearchTerm={handleSetSearchTerm}
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
