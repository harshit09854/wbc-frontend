import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../api/axiosInstance";

const WishlistItems = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { isAuthenticated } = useAuth();

  // get wishlist items from backend
  useEffect(() => {
    if (isAuthenticated) {
      const checkWishlist = async () => {
        try {
          const response = await axiosInstance.get("/buyer/wishlist");
          setWishlistItems(response.data.wishlist);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      };
      checkWishlist();
    }
  }, [isAuthenticated]);

  // handle loading state
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isAuthenticated) {
      const checkWishlist = async () => {
        try {
          const response = await axiosInstance.get("/buyer/wishlist");
          setWishlistItems(response.data.wishlist);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        } finally {
          setLoading(false);
        }
      };
      checkWishlist();
    }
  }, [isAuthenticated]);
  if (loading) {
    return <div className="text-center py-20">Loading wishlist...</div>;
  }

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (item) => {
    // Add to cart functionality here
    console.log("Moving to cart:", item);
    // Remove from wishlist after adding to cart
    handleRemoveFromWishlist(item.id);
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return isAuthenticated ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      {/* Wishlist content goes here */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            My Wishlist ({wishlistItems.length} items)
          </h1>
          {wishlistItems.length > 0 && (
            <button
              onClick={() => setWishlistItems([])}
              className="text-[#8B0000] hover:text-[#660000] flex items-center"
            >
              <FaTrash className="mr-2" />
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <FaHeart className="mx-auto h-12 w-12 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Add items that you like to your wishlist. Review them anytime and
              easily move them to the cart.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8B0000] hover:bg-[#660000]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.originalPrice && (
                    <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      {calculateDiscount(item.originalPrice, item.price)}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <Link
                    to={`/product/${item.id}`}
                    className="hover:text-[#8B0000]"
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-2">
                    Sold By: {item.seller}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-[#8B0000]">
                      {formatPrice(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-gray-500 line-through text-sm">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="flex-1 bg-[#8B0000] text-white py-2 px-4 rounded hover:bg-[#660000] transition-colors duration-300 flex items-center justify-center"
                      disabled={!item.inStock}
                    >
                      <FaShoppingCart className="mr-2" />
                      {item.inStock ? "Move to Cart" : "Out of Stock"}
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="p-2 text-gray-400 hover:text-[#8B0000] border border-gray-200 rounded hover:border-[#8B0000] transition-colors duration-300"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-[#8B0000] text-[#8B0000] rounded-md hover:bg-[#fff5f5] transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="text-center py-20 text-gray-600 mt-16">
      <h2 className="text-2xl font-semibold mb-4">You are not logged in.</h2>
      <p className="mb-6">Please Login to view your wishlist.</p>
      <Link to="/login">
        <button className="inline-flex items-center px-4 py-2 border border-transparent bg-[#8B0000] text-white rounded hover:bg-[#660000]">
          Login
        </button>
      </Link>
    </div>
  );
};

export default WishlistItems;
