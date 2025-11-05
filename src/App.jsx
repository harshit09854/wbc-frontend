import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";

import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductInfo/ProductDetails";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";

import Login from "./pages/Buyer/Login";
import Signup from "./pages/Buyer/Signup";

import SellerDashboard from "./pages/Seller/SellerDashboard";
import BecomeSeller from "./pages/Seller/BecomeSeller";
import SellerAccount from "./pages/Seller/SellerAccount/SellerAccount";
import AddProduct from "./pages/Seller/AddProduct";
import SellerLogin from "./pages/Seller/SellerLogin";
import {useState} from "react";
import axiosInstance from "./api/axiosInstance"
import { useEffect } from "react";
import Cart from "./pages/UserProfile/Cart";
import Billing from "./pages/UserProfile/Billing";
import Payment from "./pages/UserProfile/Payment";
import WishlistItems from "./pages/UserProfile/WishlistItems";
import OrderPage from "./pages/UserProfile/OrderPage";
import MyProfilePage from "./pages/UserProfile/Profile";
import CartProvider from "./contexts/CartContext";
// import { useAuth } from '../contexts/useAuth'




function App() {
  const [productsData, setProductsData] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // 🔹 Fetch ALL Products (to provide price data to CartContext)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        // Assuming your API returns products in response.data.products
        setProductsData(response.data.products || []);
      } catch (error) {
        console.error("Error fetching all products for context:", error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchAllProducts();
  }, []);
  return (
    <AuthProvider>
      <CartProvider productsData={productsData}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/become-seller" element={<BecomeSeller />} />
            <Route path="/seller-account" element={<SellerAccount />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/wishlist" element={<WishlistItems />} />
            <Route path="/seller-login" element={<SellerLogin />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/my-profile" element={<MyProfilePage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
