import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import CartItem from "./CartItem";
import { cartAuth } from "../../contexts/CartContext";

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0); // 🎯 FIX: Destructure the getTotalCartAmount function from the context

  const { addCart, removeFromCart, getTotalCartAmount } = cartAuth(); // FIX 2: Corrected the useEffect structure and logic

  useEffect(() => {
    const fetchCartItems = async () => {
      // If not authenticated, we can't fetch a server cart.
      if (!isAuthenticated()) {
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get("/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }); // Ensure you handle the API response structure correctly
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems(); // Add isAuthenticated as a dependency to refetch if auth state changes
  }, [
    isAuthenticated,
  ]); /* // Added dependency array // ❌ REMOVED: The local calculateSubtotal function is removed because we now use the context function.
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 0;
      return total + price * quantity;
    }, 0);
  };
  */

  const handleQuantityChange = async (productId, type) => {
    const item = cartItems.find((i) => i.product._id === productId);
    if (!item) {
      return;
    } // Determine the required action based on the requested change

    if (type === "increment") {
      try {
        // Your CartContext's addCart increments the count on the server
        await addCart(productId); // Optimistically update local state to reflect the change

        setCartItems((prev) =>
          prev.map((i) =>
            i.product._id === productId ? { ...i, quantity: i.quantity + 1 } : i
          )
        );
      } catch (error) {
        console.error("Error incrementing cart item:", error);
      }
    } else if (type === "decrement") {
      // Logic for decrementing and removing if quantity reaches 0
      if (item.quantity - 1 >= 0) {
        try {
          await removeFromCart(productId); // Optimistically update local state

          if (item.quantity - 1 === 0) {
            // Remove item completely if quantity is now 0
            setCartItems((prev) =>
              prev.filter((i) => i.product._id !== productId)
            );
          } else {
            // Just decrement quantity
            setCartItems((prev) =>
              prev.map((i) =>
                i.product._id === productId
                  ? { ...i, quantity: i.quantity - 1 }
                  : i
              )
            );
          }
        } catch (error) {
          console.error("Error decrementing cart item:", error);
        }
      }
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const item = cartItems.find((i) => i.product._id === productId);
      if (item) {
        // Remove from client view immediately
        setCartItems((prev) => prev.filter((i) => i.product._id !== productId)); // Call context function. NOTE: This only decrements by one. // If you intend to remove the item completely, you must call a dedicated backend endpoint // (like a DELETE request) or call removeFromCart multiple times.

        await removeFromCart(productId);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    const total = getTotalCartAmount(cartItems);
    setSubtotal(total);
  }, [cartItems]);

  const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

  if (loading) {
    return <div className="text-center py-20">Loading your cart...</div>;
  }

  if (!isAuthenticated() || cartItems.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 mt-16">
               {" "}
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h2> 
              <p className="mb-6">Add some products to see them here!</p>       {" "}
        <Link
          to="/products"
          className="inline-block bg-[#6A0DAD] text-white px-6 py-3 rounded-md hover:bg-[#B24592] transition-all duration-300"
        >
                    Go to Shop        {" "}
        </Link>
             {" "}
      </div>
    );
  }

  return (
    <div className="mt-15 max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>     {" "}
      <div className="space-y-4">
               {" "}
        {cartItems.map((item) => (
          <CartItem
            key={item.product._id}
            item={item}
            onIncrement={() =>
              handleQuantityChange(item.product._id, "increment")
            }
            onDecrement={() =>
              handleQuantityChange(item.product._id, "decrement")
            }
            onRemove={() => handleRemoveItem(item.product._id)}
            formatPrice={formatPrice}
          />
        ))}
             {" "}
      </div>
           {" "}
      <div className="mt-10 text-right">
               {" "}
        <p className="text-xl font-semibold">
                    Subtotal: {formatPrice(subtotal)}       {" "}
        </p>
               {" "}
        <Link
          to="/billing"
          className="mt-4 inline-block bg-[#6A0DAD] text-white px-6 py-3 rounded-md hover:bg-[#B24592] transition-all duration-300"
        >
                    Proceed to Checkout        {" "}
        </Link>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default Cart;
