import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Make sure this path is correct, relative to this file
import axiosInstance from "../../../api/axiosInstance";
import { Link } from "react-router-dom";
import { Plus, Archive } from "lucide-react";

// A simple loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

const ProductsSection = () => {
  const navigate = useNavigate();

  // State Management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data Fetching
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // ✅ **FIX 1:** Changed "/seller/products" to "/products"
        // The /api/seller part is already in axiosInstance.baseURL
        const response = await axiosInstance.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data.products);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Could not load your products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty array means run once on mount

  // API Handlers
  const handleEditProduct = (id) => {
    navigate("/add-product", {
      // Assuming this is your edit/add route
      state: {
        editMode: true,
        product: id,
      },
    });
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // ✅ **FIX 2:** Changed "/seller/product/:id" to "/product/:id"
      // This matches your router file: router.delete("/product/:productId", ...)
      await axiosInstance.delete(`/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update state to remove the product from the UI
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  // --- Render Logic ---
  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <div className="text-center py-8 bg-red-100 rounded-xl shadow text-red-700">
          <p>{error}</p>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center bg-white p-12 rounded-lg shadow-md h-64">
          <Archive size={64} className="text-gray-400 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-500 mb-6">
            You haven't added any products yet. Let's add your first one!
          </p>
          <Link
            to="/seller-add-product" // Or your correct route
            className="bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Add Your First Product
          </Link>
        </div>
      );
    }

    // Show products table
    return (
      <>
        <div className="bg-white rounded-xl shadow overflow-auto">
          <table className="w-full table-auto min-w-max">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Product Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Price
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Stock
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Category
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {product.images && product.images.length > 0 && (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-10 rounded-md object-cover mr-3"
                        />
                      )}
                      <span className="font-medium text-gray-800">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    ₹{product.price}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {product.stock}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap capitalize">
                    {product.category}
                  </td>
                  <td className={`px-4 py-3 whitespace-nowrap`}>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock > 0 ? "Active" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => handleEditProduct(product._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 font-medium"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">🛍️ My Products</h2>
        <Link
          to="/add-product" // Or your correct route
          className="bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add New Product
        </Link>
      </div>

      {renderContent()}
    </section>
  );
};

export default ProductsSection;
