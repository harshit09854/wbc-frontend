import { Heart, Play } from 'lucide-react';
export default function HeroSection(){
 return(
     <div className="relative overflow-hidden py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">      
          <div className="lg:flex lg:items-center lg:space-x-12">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-5xl font-bold text-[#2E2E2E] mb-6 leading-tight">
                About <span className="text-[#6A0DAD]">Women Business Circle</span>
              </h1>
              <p className="text-xl text-[#7F7F7F] mb-8 leading-relaxed">
                The Women Business Circle (WBC) is a dynamic platform founded to empower and uplift women entrepreneurs across India. WBC offers mentorship, networking opportunities, and a collaborative ecosystem where women can access business-resources, share experiences, and scale their ventures with confidence. Through seminars, workshops, and peer-group forums, WBC is committed to fostering leadership, innovation, and financial independence among its members.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/founder" className="bg-[#E75480] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2">
                  <Play size={16} />
                  <span>Explore Founder's Story</span>
                </a>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://media.gettyimages.com/id/685885118/video/six-women-of-different-ethnicity-in-a-project-meeting-in-the-conference-room.jpg?s=640x640&k=20&c=_udtyiXjZd2UirE-NWlkGUHTqroeRrlY-EKDPj9tTSY=" 
                  alt="Yoga studio with people practicing"
                  className="rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] w-full transform hover:scale-105 transition-transform ease-in"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#F8F0FF] p-3 rounded-full">
                      <Heart className="text-[#6A0DAD]" size={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2E2E2E]">5000+</p>
                      <p className="text-[#7F7F7F]">Lives Transformed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 )
}