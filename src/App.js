import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Fragment, useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Context from "./components/Context";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import IndexPage from "./pages/IndexPage";
import NavHeader from "./components/NavHeader";
import ShoppingCartProductsPage from "./pages/ShoppingCartProductsPage";
import OrderInformationsPage from "./pages/OrderInformationsPage";
import Footer from "./components/Footer";
import OrdersPage from "./pages/OrdersPage";

function App() {

  const [name, setName] = useState('');
    useEffect(()=>{
        (
            async () => {
            const response = await fetch('https://localhost:7228/api/Auth/user',{
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        
        const content =await response.json();
        setName(content.name);
      }
        )();
    })

  const Layout = () =>{
    return(
      <>
      <NavHeader name={name}/>
      <Outlet/>
      <Footer></Footer>
      </>
    )
  }

  return (
    <div className="">
      <Context.Provider value={name}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>   
              <Route path = "login" element={<LoginPage setName = {setName}/>}></Route>
              <Route path = "register" element={<RegisterPage/>}></Route>
              <Route path="product/:id" element={<ProductDetailsPage/>}></Route>
              <Route path="shoppingCart" element={<ShoppingCartPage/>}></Route>
              <Route path="shoppingCartProducts" element={<ShoppingCartProductsPage/>}></Route>
              <Route path="myOrders" element={<OrdersPage/>}></Route>
              <Route path="orderInformations" element={<OrderInformationsPage/>}></Route>
              <Route path="orderConfirmation" element={<OrderConfirmationPage/>}></Route>
              <Route path="index" element={<IndexPage/>}></Route>
              <Route path = "/" exact element={<HomePage name={name}/>}>
              
            </Route>
            </Route>
          </Routes>
          
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
