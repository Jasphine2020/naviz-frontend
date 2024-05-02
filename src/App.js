import { Header } from './components/header';
import { Footer } from './components/footer';
import { Home } from './pages/home';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { Cart } from './pages/cart';
import { Admin } from './pages/admin';
import { createContext } from 'react';
import axios from 'axios'

export const AppContext = createContext()

function App() {
  
  const [navLink, setNavLink] = useState('/cart')
  const [page, setPage] = useState("bi bi-cart-fill")
  const [pageText, setPageText] = useState("Cart")
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState({
    "credentials": {},
    "orders": [{},]
})
  const [flags, setFlags] = useState([])
  const [all, setAll] = useState([])
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('all')
  const [selections, setSelections] = useState([])
  const [priceValue, setPriceValue] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)
  const [orderForm, setOrderForm] = useState({})

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get('http://127.0.0.1:8000/')
      setAll(response.data.products)

      var sodas = [];
      var waters = [];
      var others = []

      for (var i = 0; i < response.data.products.length; i++){
        if (response.data.products[i]['category'] == 'soda') {
          sodas.push(response.data.products[i])
        } else if (response.data.products[i]['category'] == 'water'){
          waters.push(response.data.products[i])
        }else if (response.data.products[i]['category'] == 'other'){
          others.push(response.data.products[i])
        }
      }

      if (category == 'all') {
        setProducts(response.data.products)
      } else if(category == 'soda'){
        setProducts(sodas)
      } else if(category == 'water'){
        setProducts(waters)
      } else {
        setProducts(others);
      }

      return response;
    }
    
    fetchProducts();

  }, [category])

  return (
    <AppContext.Provider value={{flags, setFlags, cart, all, navLink, setNavLink, page, setPage, products, setProducts, products, setCategory, selections, setSelections, pageText, setPageText, priceValue, setPriceValue, grandTotal, setGrandTotal, cart, setCart,orderForm, setOrderForm, orders, setOrders}}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
        </Routes>
        <Footer/>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
