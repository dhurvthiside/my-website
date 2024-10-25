import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import AboutUs from "./Pages/AboutUs";
import Popular from "./Components/Popular/Popular";
import Footer from "./Components/Footer/Footer";
// import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import Signup from "./Pages/Signup";
import { AuthContextProvider } from "./Context/AuthContext";
import Login from "./Pages/Signin";
import AddProduct from "./Pages/AddProduct";
import PrivateRoute from "./Components/PrivateRoute"; // Import PrivateRoute

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/sign-in" element={<Login />} />
            <Route
              path="/earrings"
              element={<ShopCategory category="earrings" />}
            />
            <Route
              path="/womens"
              element={<ShopCategory banner={women_banner} category="women" />}
            />
            <Route
              path="/kids"
              element={<ShopCategory banner={kid_banner} category="kid" />}
            />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/popular" element={<Popular />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/about" element={<AboutUs />} />

            {/* Protect AddProduct Route */}
            <Route
              path="/add-product"
              element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
