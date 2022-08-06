import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { useState } from "react";
import { Navbar, Footer } from "./components";

import {
    UserInfo,
    Orders,
    Login,
    Categories,
    Products,
    ProductDetails,
    SearchPage,
    Home,
    FAQs,
    Cart,
    Security,
} from "./pages";
import Register from "./pages/Log-Reg/Register.js";
import Checkout from "./pages/Checkout/Checkout";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/products" element={<Products />} />
                <Route path="/products/:categoryId" element={<Products />} />
                <Route path="/productDetails" element={<ProductDetails />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/profile" element={<UserInfo />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile/security" element={<Security />} />
                <Route path="/" element={<Home />} />
                <Route path="/SearchPage" element={<SearchPage />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <ToastContainer />
            <Footer />
        </BrowserRouter>
    );
};
export default App;
