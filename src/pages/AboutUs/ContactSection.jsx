import {  MapPin, Phone, Mail } from 'lucide-react';
export default function ContactSection(){
    return(
           <div className="bg-white py-20 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#9B59B6] mb-6">Visit Our Studio</h2>
            <p className="text-xl text-[#7F7F7F]">
              Come experience our welcoming space and meet our community in person
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-[#F8F0FF] p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-[#2E2E2E] mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-full shadow-md">
                      <MapPin className="text-[#6A0DAD]" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#2E2E2E]">Main Studio</h4>
                      <p className="text-[#7F7F7F]">808,silver residency ,near petrol pump, thoor ,Udaipur,<br />Rajasthan, India, 313001</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-full shadow-md">
                      <Phone className="text-[#6A0DAD]" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#2E2E2E]">Phone</h4>
                      <a href="tel:9982498555" className="text-[#7F7F7F] hover:text-[#B24592]">9982498555</a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-full shadow-md">
                      <Mail className="text-[#6A0DAD]" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#2E2E2E]">Email</h4>
                      <a href={"mailto:info@metafitwellness.com"} className="text-[#7F7F7F] hover:text-[#B24592]">info@metafitwellness.com</a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium text-[#2E2E2E] mb-4">Studio Hours</h4>
                  <div className="space-y-2 text-[#7F7F7F]">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>6:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>7:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://www.futurainteriors.in/blogs/wp-content/uploads/2022/01/shutterstock_1589532376-min-scaled.jpg" 
                alt="Peaceful yoga studio interior"
                className="rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 ease-in"
              />
            </div>
          </div>
        </div>
      </div>
    
    )
}
