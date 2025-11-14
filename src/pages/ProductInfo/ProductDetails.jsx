import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../contexts/AuthContext";
// 🎯 Import cartAuth
import { cartAuth } from "../../contexts/CartContext"; 

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  const isLoggedIn = !!localStorage.getItem("token");

  // 🎯 Destructure addCart from the context
  const { addCart } = cartAuth();

  // 🔹 Fetch product + related
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}`);
        const productData = response.data.product;
        setProduct(productData);

        if (productData?.category) {
          const relatedRes = await axiosInstance.get(`/products`);
          const related = relatedRes.data.products.filter(
            (item) =>
              item.category === productData.category &&
              item._id !== productData._id
          );
          setRelatedProducts(related.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  // 🔹 Quantity change
  const handleQuantityChange = (type) => {
    if (type === "increment" && quantity < (product.stock || 10)) {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // 🔹 Add to Cart (Now uses the CartContext's addCart function)
  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
        // Since your context's addCart only adds ONE item at a time,
        // we call it 'quantity' times using Promise.all for concurrency.
        const addPromises = [];
        for (let i = 0; i < quantity; i++) {
            addPromises.push(addCart(product._id));
        }
        await Promise.all(addPromises);
        
        console.log(`${quantity} of ${product.name} added to cart successfully!`);
        alert(`${quantity} of ${product.name} added to your cart!`);

        // Reset quantity to 1 after adding (common UX practice)
        setQuantity(1);

        // NOTE: You can remove the window.dispatchEvent line if your CartContext
        // manages and updates the global cart state correctly.

    } catch (error) {
        // The CartContext handles the server/local storage logic internally, 
        // so any error here is a failure of the context's internal logic.
        console.error("Error adding product via CartContext:", error);
        alert(`Failed to add ${product.name} to cart. Please try again.`);
    }
  };

  // 🔹 Buy Now
  const handleBuyNow = async (product) => {
    if (!isLoggedIn) {
      alert("Please log in to continue with checkout.");
      navigate("/login");
      return;
    }

    // First add the items to the cart
    await handleAddToCart(product);
    // Then navigate to checkout
    navigate("/billing");
  };

  const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

  const TabButton = ({ id, label, active }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 ${
        active
          ? "text-[#8B0000] border-b-2 border-[#8B0000] font-medium"
          : "text-gray-600 hover:text-[#8B0000]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      {/* Product Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="w-full h-auto object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-sm text-gray-600 mb-4">SKU: {product.sku}</p>
          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold text-[#8B0000]">
              {formatPrice(product.price)}
            </span>
            <span className="ml-2 text-green-600 text-sm">IN STOCK</span>
          </div>

          {/* Quantity */}
          <div className="flex items-center mb-6">
            <span className="mr-4 text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => handleQuantityChange("decrement")}
                className="px-3 py-1 border-r hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increment")}
                className="px-3 py-1 border-l hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => handleAddToCart(product)}
              className="flex-1 bg-[#8B0000] text-white py-3 px-6 rounded-md hover:bg-[#660000] transition-colors duration-300 flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button
              onClick={() => handleBuyNow(product)}
              className="flex-1 border border-[#8B0000] text-[#8B0000] py-3 px-6 rounded-md hover:bg-[#fff5f5] transition-colors duration-300"
            >
              Buy Now
            </button>
            <button className="p-3 border border-[#8B0000] text-[#8B0000] rounded-md hover:bg-[#fff5f5] transition-colors duration-300">
              <FaHeart />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-4">
          <TabButton
            id="details"
            label="Details"
            active={activeTab === "details"}
          />
          <TabButton
            id="specifications"
            label="Specifications"
            active={activeTab === "specifications"}
          />
          <TabButton
            id="reviews"
            label="Reviews"
            active={activeTab === "reviews"}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === "details" && (
          <p>{product.description || "No details available."}</p>
        )}
        {activeTab === "specifications" && (
          <ul className="list-disc pl-6 space-y-2">
            {product.specifications?.map((spec, i) => (
              <li key={i}>{spec}</li>
            ))}
          </ul>
        )}
        {activeTab === "reviews" && (
          <div className="text-center text-gray-600">No reviews yet.</div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={item.images?.[0] || item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-[#8B0000] font-semibold">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full mt-3 bg-[#8B0000] text-white py-2 rounded-md hover:bg-[#660000] transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;