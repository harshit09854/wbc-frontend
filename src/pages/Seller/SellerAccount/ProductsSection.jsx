import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { Plus, Archive, Edit3, Trash2 } from "lucide-react";

// Loading Spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600 border-opacity-70"></div>
  </div>
);

const ProductsSection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axiosInstance.get("/products/seller", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Could not load your products. Please add your products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Edit
  const handleEditProduct = (id) => {
    navigate("/add-product", {
      state: { editMode: true, product: id },
    });
  };

  // Delete
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const token = localStorage.getItem("token");
      console.log(token)
      await axiosInstance.delete(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  // --- UI RENDER ---
  const renderContent = () => {
    if (loading) return <LoadingSpinner />;
    // if (error)
    //   return (
    //     <div className="text-center py-8 bg-red-100 rounded-xl shadow text-red-700">
    //       <p>{error}</p>
    //     </div>
    //   );

    if (products.length === 0)
      return (
        <div className="flex flex-col items-center justify-center text-center bg-white p-10 rounded-2xl shadow-md h-80">
          <Archive size={72} className="text-gray-400 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-500 mb-6">
            You haven’t added any products yet. Let’s add your first one!
          </p>
          {/* <Link
            to="/add-product"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 px-5 rounded-xl shadow-md hover:opacity-90 transition flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Add Your First Product
          </Link> */}
        </div>
      );

    return (
      <div className="bg-white rounded-2xl shadow overflow-x-auto border border-gray-100">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-5 py-3 text-left">Product</th>
              <th className="px-5 py-3 text-left">Price</th>
              <th className="px-5 py-3 text-left">Stock</th>
              <th className="px-5 py-3 text-left">Category</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover mr-3 border border-gray-200"
                      />
                    )}
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4">₹{product.price}</td>
                <td className="px-5 py-4">{product.stock}</td>
                <td className="px-5 py-4 capitalize">{product.category}</td>
                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock > 0 ? "Active" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap flex gap-3">
                  <button
                    onClick={() => handleEditProduct(product._id)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    <Edit3 size={18} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium transition"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          🛍️ My Products
        </h2>
        <Link
          to="/add-product"
          className="bg-linear-to-r from-purple-600 to-indigo-600 text-white py-2.5 px-5 rounded-xl shadow-md hover:opacity-90 transition flex items-center"
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
