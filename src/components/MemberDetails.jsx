// src/components/MemberDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  ArrowLeft,
  Briefcase,
  Sparkles,
  ShoppingCart,
  Star,
} from "lucide-react";

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  const [memberDetails, setMemberDetails] = useState(null);

  //   const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMemberprod = async () => {
      try {
        const response = await axiosInstance.get(`/showSellerProds/${id}`);
        setProduct(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchMemberprod();
  }, [id]);

  // fetch the member details
  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await axiosInstance.get(`/member/${id}`);
        setMemberDetails(response.data);
        console.log(response.data.seller);
      } catch (error) {
        console.error("Failed to fetch member details:", error);
      }
    };
    fetchMemberDetails();
  }, [id]);

  // const profileDes[{name, businessDescription, profileImage}] = memberDetails;

  //   const addToCart = (product) => {
  //     setCart((prevCart) => {
  //       const existingItem = prevCart.find((item) => item.id === product.id);
  //       if (existingItem) {
  //         return prevCart.map((item) =>
  //           item.id === product.id
  //             ? { ...item, quantity: item.quantity + 1 }
  //             : item
  //         );
  //       }
  //       return [...prevCart, { ...product, quantity: 1 }];
  //     });

  //     // Show success feedback
  //     // alert(${product.name} added to cart!);
  //   };

  if (!memberDetails)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-center text-gray-600 text-xl">Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F0FF] via-white to-[#F8F0FF] p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-gray-200 text-gray-700 hover:text-white hover:bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 font-medium"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/50 sticky top-8">
              <div className="text-center ">
                <img
                  src={memberDetails.seller.profileImage}
                  alt={memberDetails.seller.name}
                  className="w-30 h-30  rounded-full mb-5 object-cover mx-auto shadow-lg border-4 border-white"
                />
                <h2 className="text-2xl font-bold text-gray-800">
                  {memberDetails.seller.name}
                </h2>
                <div className="flex  items-center justify-center  gap-2 mt-2 text-gray-600">
                  <Briefcase size={16} />
                  <p className="text-sm flex items-center gap-1 font-semibold">
                    {memberDetails.seller.businessName}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mt-3">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-700"></span>
                  </div>
                  <span className="text-sm text-gray-500">( reviews)</span>
                </div>

                <p className="text-gray-500 text-sm mt-1">Age:50</p>
              </div>

              {/* Description */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles size={18} className="text-purple-600" />
                  About
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {memberDetails.seller.businessDescription}
                </p>

                {/* {product.name.length > 10
                  ? `${product.name.slice(0, 10)}...`
                  : product.name} */}
              </div>
            </div>
          </div>

          {/* Products Section */}
          {Array.isArray(product) &&
            product.map((product) => (
              <div key={product._id} className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/50">
                  {/* Header with ShoppingCart icon */}
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <ShoppingCart size={18} className="text-purple-600" />
                    Products
                  </h3>

                  {/* Product details */}
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-gray-900">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-md text-green-600 font-semibold">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
