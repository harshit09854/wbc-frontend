import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Changed to HashRouter
import { AuthProvider } from "./contexts/AuthContext";
import CartProvider from "./contexts/CartContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductInfo/ProductDetails";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Founderpage from "./pages/AboutUs/FounderPage";
import Login from "./pages/Buyer/Login";
import Signup from "./pages/Buyer/Signup";
import SellerDashboard from "./pages/Seller/SellerDashboard";
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
import ProductList from "./components/ProductList";
import MembersSection from "./components/MembersSection";
import MemberDetails from "./components/MemberDetails";
import UpcomingEvents from "./pages/Home/UpcomingEvents";

// Layout for pages with Navbar + Footer
const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="min-h-[calc(100vh-200px)]">{children}</div>
    <Footer />
  </>
);

function App() {
  const [productsData, setProductsData] = useState([]);

  return (
    <AuthProvider>
      <CartProvider productsData={productsData}>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Route without Navbar/Footer */}
            <Route path="/members/:id" element={<MemberDetails />} />

            {/* Routes with Navbar/Footer */}
            <Route
              path="/"
              element={<Layout><Home /></Layout>}
            />
            <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
            <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />
            <Route path="/seller-dashboard" element={<Layout><SellerDashboard /></Layout>} />
            <Route path="/become-seller" element={<Layout><BecomeSeller /></Layout>} />
            <Route path="/seller-account" element={<Layout><SellerAccount /></Layout>} />
            <Route path="/products" element={<Layout><ProductList /></Layout>} />
            <Route path="/product/:productId" element={<Layout><ProductDetails /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/billing" element={<Layout><Billing /></Layout>} />
            <Route path="/payment" element={<Layout><Payment /></Layout>} />
            <Route path="/wishlist" element={<Layout><WishlistItems /></Layout>} />
            <Route path="/seller-login" element={<Layout><SellerLogin /></Layout>} />
            <Route path="/add-product" element={<Layout><AddProduct /></Layout>} />
            <Route path="/orders" element={<Layout><OrderPage /></Layout>} />
            <Route path="/my-profile" element={<Layout><MyProfilePage /></Layout>} />
            <Route path="/members" element={<Layout><MembersSection /></Layout>} />
            <Route path="/founder" element={<Layout><Founderpage /></Layout>} />
            <Route path="/upcoming-events" element={<Layout><UpcomingEvents /></Layout>} />
            <Route path="/terms-conditions" element={<Layout><TermsConditions /></Layout>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
