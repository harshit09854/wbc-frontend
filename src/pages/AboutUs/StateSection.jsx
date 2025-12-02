import { Heart, Users, Award, Star } from 'lucide-react';

export default function StatsSection(){
    const stats = [
    { number: '100+', label: 'Happy Students', icon: Users },
    { number: '10+', label: 'Years Experience', icon: Award },
    { number: '50+', label: 'Expert Instructors', icon: Star },
    { number: '100+', label: 'Classes Weekly', icon: Heart }
  ];
    return(
       <div className="bg-gradient-to-r from-[#6A0DAD] to-[#B24592] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent size={32} />
                  </div>
                  <p className="text-3xl font-bold mb-2">{stat.number}</p>
                  <p className="text-gray-200">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div> 
    )
}