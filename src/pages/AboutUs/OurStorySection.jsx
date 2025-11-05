import React from 'react'
import ourstory from "../../assets/ourstory.jpeg";







export default function OurStorySection(){
    
    return(
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:flex lg:items-center lg:space-x-12">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <img 
              src={ourstory}
              alt="Founder practicing yoga"
              className="rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] w-full transform hover:scale-105 transition-transform ease-in"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-6xl font-bold text-[#9B59B6] mb-6">Our Story</h2>
            <div className="space-y-6 text-[#7F7F7F] leading-relaxed">
              <p>
                The Women Business Circle (WBC) was founded by Acharya Anima Goswami, a visionary leader, Astro-Vastu expert, and spiritual mentor from Udaipur, with a mission to empower women entrepreneurs across India. What began as a small initiative has grown into a dynamic community where women come together to learn, collaborate, and grow — both personally and professionally. Guided by Acharya Anima Goswami’s unique blend of spiritual wisdom and entrepreneurial insight, WBC provides mentorship, networking opportunities, and practical business resources that help women turn their dreams into successful ventures. Rooted in integrity, collaboration, and self-empowerment, our journey continues to inspire women to lead with confidence, create with purpose, and achieve financial independence.
               </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <h3 className="text-xl font-bold text-[#2E2E2E] mb-2">Founded</h3>
                <p className="text-3xl font-bold text-[#6A0DAD]">2014</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <h3 className="text-xl font-bold text-[#2E2E2E] mb-2">Locations</h3>
                <p className="text-3xl font-bold text-[#6A0DAD]">5+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
}