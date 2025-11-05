import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHeart, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { products } from "./products";

const Home = () => {
  // State for product counts
  const [productCounts, setProductCounts] = useState(
    Array(products.length).fill(0)
  );

  // Update count function
  const updateCount = (productId, count) => {
    const newCounts = [...productCounts];
    newCounts[productId - 1] = count;
    setProductCounts(newCounts);
  };

  return (
    <div className="mt-19 ">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col md:flex-row items-center bg-gray-50">
        {/* Main Image */}
        <div className="w-full h-full md:absolute left-0 top-0">
          <img
            src="/img1.jpg"
            alt="Living room interior with plant and rattan chair"
            className="w-full h-[40vh] md:h-[80vh] object-cover"
          />
        </div>

        {/* Content Card */}
        <div
          className="w-[90%] md:w-[40%] lg:w-[35%] bg-[#FFF9F0] p-6 md:p-8 lg:p-12 rounded-lg shadow-lg 
                      mx-4 md:mr-8 lg:mr-12 md:ml-auto -mt-8 md:mt-0 relative"
        >
          <div className="mb-3 md:mb-4">
            <span className="text-sm uppercase tracking-wider text-[#8B0000]">
              New Arrival
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4 md:mb-6 text-[#8B0000]">
            Discover Our
            <br />
            New Collection
          </h1>

          <p className="text-[#771D1D] mb-6 md:mb-8 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>

          <Link to="/products">
            <button className="mt-3 bg-[#8B0000] text-white px-8 py-3 rounded hover:bg-[#660000] transition-colors duration-300">
              BUY NOW
            </button>
          </Link>
        </div>
      </section>

      {/* Browse The Range Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Heading with horizontal lines */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="flex-grow border-t border-[#8B0000]"></div>
              <h2 className="px-4 text-3xl md:text-4xl font-serif font-bold text-[#8B0000] whitespace-nowrap">
                Shop By Category
              </h2>
              <div className="flex-grow border-t border-[#8B0000]"></div>
            </div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Dining Card */}
            <Link to="/products">
              <div className="group cursor-pointer">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img
                    src="/BrowseImg1.jpg"
                    alt="Food & Kitchen products"
                    className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-800">
                  Food & Kitchen
                </h3>
              </div>
            </Link>

            {/* Living Card */}
            <Link to="/products">
              <div className="group cursor-pointer">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img
                    src="/BrowseImg2.jpg"
                    alt="Beauty and Wellness products"
                    className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-800">
                  Beauty & Wellness
                </h3>
              </div>
            </Link>

            {/* Bedroom Card */}
            <Link to="/products">
              <div className="group cursor-pointer">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img
                    src="/BrowseImg3.jpg"
                    alt="Gifts and Decor items"
                    className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-800">
                  Gifts & Decor
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-16 md:py-24 mt-0 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Heading with horizontal lines */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="flex-grow border-t border-[#8B0000]"></div>
              <h2 className="px-4 text-3xl md:text-4xl font-serif font-bold text-[#8B0000] whitespace-nowrap">
                Our Products
              </h2>
              <div className="flex-grow border-t border-[#8B0000]"></div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaHeart className="text-gray-400 hover:text-red-500 transition-colors" />
                  </button>

                  {productCounts[index] > 0 && (
                    <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateCount(
                            product.id,
                            Math.max(0, productCounts[index] - 1)
                          )
                        }
                        className="p-1"
                      >
                        <FaMinus className="text-gray-600" />
                      </button>
                      <span className="w-8 text-center">
                        {productCounts[index]}
                      </span>
                      <button
                        onClick={() =>
                          updateCount(product.id, productCounts[index] + 1)
                        }
                        className="p-1"
                      >
                        <FaPlus className="text-gray-600" />
                      </button>
                    </div>
                  )}

                  <div
                    className={`absolute top-4 left-4 ${product.tag.color} text-white text-sm px-2 py-1 rounded`}
                  >
                    {product.tag.text}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg text-[#8B0000] font-semibold mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    {productCounts[index] === 0 && (
                      <button
                        onClick={() => updateCount(product.id, 1)}
                        className="p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800"
                      >
                        <FaShoppingCart />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Know More Button */}
          <div className="flex justify-center mt-10">
            <Link to="/products">
              <button className="bg-[#8B0000] text-white px-8 py-3 rounded hover:bg-[#660000] transition-colors duration-300">
                Know More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="py-12 bg-gray-20 mt-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-center text-xl md:text-2xl text-[#8B0000] mb-8 md:mb-12">
            TRUSTED BY OVER 100+ SELLERS
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 opacity-70">
            {/* Company Logos */}
            <img
              src="./amazon-logo.webp"
              alt="Amazon"
              className="h-6 md:h-8 grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="./amazon-logo.webp"
              alt="Etsy"
              className="h-6 md:h-8 grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="./amazon-logo.webp"
              alt="Shopify"
              className="h-6 md:h-8 grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="./amazon-logo.webp"
              alt="eBay"
              className="h-6 md:h-8 grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="./amazon-logo.webp"
              alt="Alibaba"
              className="h-6 md:h-8 grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Gateway to Heritage Section */}
      <section className="py-16 md:py-24 bg-[#FFF9F0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#8B0000] mb-6">
                Empowering India's Women, One Product at a Time
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-base md:text-lg">
                  We're building a digital marketplace where Indian household
                  women transform tradition into livelihood—selling homemade
                  pickles, textiles, jewelry, snacks, and more. By giving them a
                  platform to showcase their craft, we're not just supporting
                  small businesses—we're uplifting families, preserving
                  heritage, and creating a ripple of empowerment across
                  communities.
                </p>
                <p className="text-base md:text-lg font-bold">
                  No middlemen. No barriers. Just pure talent.
                </p>
                <p className="text-base md:text-lg ">
                  Every product tells a story of resilience, creativity, and
                  care. When you shop here, you support real women, real homes,
                  and real dreams.
                </p>
                <Link to="/about-us">
                  <button className="mt-6 bg-[#8B0000] text-white px-8 py-3 rounded hover:bg-[#660000] transition-colors duration-300">
                    Know More
                  </button>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                <img
                  src="/whoWeAre.png"
                  alt="Indian Artisan at Work"
                  className="w-full rounded-lg shadow-xl"
                />
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-100 rounded-full opacity-50 -z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-100 rounded-full opacity-50 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
