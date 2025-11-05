import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../contexts/AuthContext";
import { FiShoppingCart, FiInfo } from "react-icons/fi";
import { cartAuth } from "../contexts/CartContext"; // Import cartAuth

const ProductList = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  // REMOVED: const [addedToCart, setAddedToCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const productsPerPage = 8;

  // 🎯 FIX: Changed 'addToCart' to 'addCart' to match your CartContext
  const { addCart } = cartAuth();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        // Assuming the product list is in response.data.products
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated()) return alert("Please login first");

    // 🎯 FIX: Calling the correct function 'addCart' with only 'productId'
    try {
      await addCart(productId);
      // Optional: Provide instant user feedback
      alert("Product added to cart!");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      alert("Failed to add product to cart.");
    }
    // REMOVED: setAddedToCart logic to keep the button as 'Add to Cart'
  };

  if (loading)
    return <div className="text-center py-20">Loading products...</div>;

  return (
    <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[#8B0000] font-semibold">
                  {formatPrice(product.price)}
                </p>
                {product.originalPrice && (
                  <p className="text-gray-500 line-through text-sm">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
              </div>

              {/* SIMPLIFIED: Always show 'Add to Cart' button */}
              <button
                className="w-full flex items-center justify-center gap-2 bg-[#8B0000] text-white py-2 px-4 rounded-md hover:bg-[#660000] transition-colors duration-300"
                onClick={() => handleAddToCart(product._id)}
              >
                <FiShoppingCart /> Add to Cart
              </button>

              {/* Get Details */}
              <Link
                to={`/product/${product._id}`}
                className="mt-2 inline-flex items-center justify-center gap-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-300 w-full text-center"
              >
                <FiInfo /> Get Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (unchanged) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 border rounded-md ${
                currentPage === page
                  ? "bg-[#8B0000] text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
