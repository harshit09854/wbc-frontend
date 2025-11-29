import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// src/components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import MemberDetails from "./components/MemberDetails";
import MembersSection from "./components/MembersSection";

// src/pages
import Home from "./pages/Home/Home";
// import ProductDetails from "./pages/ProductInfo/ProductDetails";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Founderpage from "./pages/AboutUs/FounderPage";

import Login from "./pages/Buyer/Login";
import Signup from "./pages/Buyer/Signup";

// import SellerDashboard from "./pages/Seller/SellerDashboard";
import BecomeSeller from "./pages/Seller/BecomeSeller";
import SellerAccount from "./pages/Seller/SellerAccount/SellerAccount";
import AddProduct from "./pages/Seller/AddProduct";
import SellerLogin from "./pages/Seller/SellerLogin";
import TermsConditions from "./pages/Seller/TermsConditions";

import Cart from "./pages/UserProfile/Cart";
import Billing from "./pages/UserProfile/Billing";
import Payment from "./pages/UserProfile/Payment";
import WishlistItems from "./pages/UserProfile/WishlistItems";
import OrderPage from "./pages/UserProfile/OrderPage";
import MyProfilePage from "./pages/UserProfile/Profile";
// import CartProvider from "./contexts/CartContext";
import UpcomingEvents from "./pages/Home/UpcomingEvents";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  // const [productsData, setProductsData] = useState([]);
  // const [loadingProducts, setLoadingProducts] = useState(true);

  return (
    <AuthProvider>
      {/* <CartProvider productsData={productsData}> */}
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Route for MemberDetails without Navbar and Footer */}
          <Route path="/members/:id" element={<MemberDetails />} />

          {/* All other routes with Navbar and Footer */}
          <Route
            path="/*"
            element={
              <div className="App">
                <Navbar />
                <Routes>
                  {/* <ScrollToTop /> */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  {/* <Route
                    path="/seller-dashboard"
                    element={<SellerDashboard />}
                  /> */}
                  <Route path="/become-seller" element={<BecomeSeller />} />
                  <Route path="/seller-account" element={<SellerAccount />} />
                  {/* <Route path="/products" element={<ProductList />} /> */}
                  {/* <Route
                    path="/product/:productId"
                    element={<ProductDetails />}
                  /> */}
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/billing/:productId" element={<Billing />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/wishlist" element={<WishlistItems />} />
                  <Route path="/seller-login" element={<SellerLogin />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/orders" element={<OrderPage />} />
                  <Route path="/my-profile" element={<MyProfilePage />} />
                  <Route path="/members" element={<MembersSection />} />
                  <Route path="/members/:id" element={<MemberDetails />} />
                  <Route path="/founder" element={<Founderpage />} />
                  <Route path="/upcoming-events" element={<UpcomingEvents />} />
                  <Route
                    path="/terms-conditions"
                    element={<TermsConditions />}
                  />
                </Routes>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
      {/* </CartProvider> */}
    </AuthProvider>
  );
}

export default App;
