// components/TrustedPartners.jsx
import React from 'react';
import news121Logo from "../../assets/121news.jpg";
import kvantalogo from "../../assets/kvantalabs.jpg";

const TrustedPartners = () => {
  const partners = [
    {
      name: "121 NEWS",
      logo: news121Logo,
      subtitle: "121 NEWS"
    },
    
    {
      name: "KVANTA LABS",
      logo: kvantalogo, 
      subtitle: "KVANTA LABS"
    },
      ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6A0DAD] mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
             Partnering with leading media and technology innovators
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 group"
            >
              <div className="h-24 mb-4 flex items-center justify-center">
                {partner.logo ? (
                  <img src={partner.logo} alt={`${partner.name} logo`} className="max-h-full max-w-full object-contain" />
                ) : (
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#6A0DAD] transition-colors duration-300">
                    {partner.name}
                  </h3>
                )}
              </div>
              
              {/* Partner Subtitle */}
              {partner.subtitle && (
                <p className="text-sm text-gray-600 mt-2 font-medium">
                  {partner.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Optional: Add some decorative elements to match your theme */}
        <div className="absolute left-1/4 -translate-x-1/2 w-32 h-32 bg-pink-100 rounded-full opacity-30 blur-2xl -z-10 mt-8"></div>
        <div className="absolute right-1/4 translate-x-1/2 w-40 h-40 bg-purple-100 rounded-full opacity-30 blur-2xl -z-10 mt-8"></div>
      </div>
    </section>
  );
};

export default TrustedPartners;