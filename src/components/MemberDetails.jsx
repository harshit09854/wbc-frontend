// src/components/MemberDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import Billing from "../pages/UserProfile/Billing";
import { Link } from "react-router-dom";
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
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [memberDetails, setMemberDetails] = useState(null);
  const [randomRating, setRandomRating] = useState(null);
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

  useEffect(() => {
    // Generate a random rating between 3.0 and 5.0
    const rating = (Math.random() * (5 - 3) + 3).toFixed(1);
    setRandomRating(rating);
  }, []);

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
    <>
      <Navbar />
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
                  {/* <div className="flex  items-center justify-center  gap-2 mt-2 text-gray-600">
                    <Briefcase size={16} />
                    <p className="text-sm flex items-center gap-1 font-semibold">
                      {memberDetails.seller.businessName}
                    </p>
                  </div> */}

                  <div className="flex items-center justify-center gap-2 mt-2 text-gray-600">
                    <Briefcase size={14} className="flex-shrink-0" />
                    <span className="text-sm font-semibold truncate">
                      {memberDetails.seller.businessName}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-current"
                      />
                      <span className="text-sm font-semibold text-gray-700">
                        {randomRating} / 5
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">(20+ reviews)</span>
                  </div>

                  {/* <p className="text-gray-500 text-sm mt-1">Age:50</p> */}
                </div>

                {/* Description */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Sparkles size={18} className="text-purple-600" />
                    About
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {showFullAbout
                      ? memberDetails.seller.businessDescription
                      : memberDetails.seller.businessDescription
                          .split(" ")
                          .slice(0, 15)
                          .join(" ") + "..."}
                  </p>

                  {/* ✨ Toggle Button */}
                  <button
                    onClick={() => setShowFullAbout(!showFullAbout)}
                    className="mt-2 text-purple-600 hover:underline text-sm font-medium"
                  >
                    {showFullAbout ? "Show Less" : "Know More"}
                  </button>
                </div>
              </div>
            </div>

            {/* Products Section */}
            {Array.isArray(product) && product.length > 0 && (
              <div className="lg:col-span-2 space-y-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <ShoppingCart size={18} className="text-purple-600" />
                  Products
                </h3>

                {product.map((prod) => (
                  <div
                    key={prod._id}
                    className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/50"
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      {/* ✨ Product Image */}
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                      />

                      {/* ✨ Product Info */}
                      <div className="flex-1 space-y-2">
                        <p className="text-xl font-bold text-gray-900">
                          {prod.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {prod.description}
                        </p>
                        <p className="text-md text-green-600 font-semibold">
                          ₹{prod.price}
                        </p>

                        {/* ✨ Buy Now Button */}
                        <Link to="/billing">
                          <button
                            onClick={() => navigate(`/billing/${prod._id}`)}
                            className="mt-3 text-white px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] hover:from-[#B24592] hover:to-[#F15F79] hover:shadow-lg transition-all duration-300"
                          >
                            Buy Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberDetails;
