import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-20 min-h-screen bg-[#F8F0FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-16 text-center bg-gradient-to-r from-[#6A0DAD] to-[#B24592] text-white rounded-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-16 py-20">
          {/* Contact Information */}
          <section>
            <h2 className="text-3xl font-bold text-[#9B59B6] mb-8">
              Contact Information
            </h2>
            <div className="grid gap-8">
              <div className="bg-white p-8 rounded-lg text-center transform transition-transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-[#6A0DAD] mb-4">
                  Address
                </h3>
                <p className="text-[#7F7F7F] leading-relaxed">
                  123 Business District
                  <br />
                  Suite 456
                  <br />
                  New York, NY 10001
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg text-center transform transition-transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <div className="text-5xl mb-4">📞</div>
                <h3 className="text-xl font-bold text-[#6A0DAD] mb-4">Phone</h3>
                <p className="text-[#7F7F7F] leading-relaxed">
                  +1 (555) 123-4567
                  <br />
                  Mon - Fri: 9:00 AM - 6:00 PM
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg text-center transform transition-transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <div className="text-5xl mb-4">✉️</div>
                <h3 className="text-xl font-bold text-[#6A0DAD] mb-4">Email</h3>
                <p className="text-[#7F7F7F] leading-relaxed">
                  info@womanbusinesscircle.com
                  <br />
                  support@womanbusinesscircle.com
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg text-center transform transition-transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <div className="text-5xl mb-4">🕒</div>
                <h3 className="text-xl font-bold text-[#6A0DAD] mb-4">
                  Office Hours
                </h3>
                <p className="text-[#7F7F7F] leading-relaxed">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section>
            <h2 className="text-3xl font-bold text-[#9B59B6] mb-8">
              Send us a Message
            </h2>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block font-semibold text-[#2E2E2E]"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full p-3 border-2 border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#6A0DAD] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block font-semibold text-[#2E2E2E]"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    className="w-full p-3 border-2 border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#6A0DAD] transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <label
                  htmlFor="subject"
                  className="block font-semibold text-[#2E2E2E]"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this about?"
                  className="w-full p-3 border-2 border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#6A0DAD] transition-colors"
                />
              </div>
              <div className="space-y-2 mb-6">
                <label
                  htmlFor="message"
                  className="block font-semibold text-[#2E2E2E]"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                  className="w-full p-3 border-2 border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#6A0DAD] transition-colors"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#E75480] text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transform transition-all hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </section>
        </div>

        {/* FAQ Section */}
        {/* <section className="py-20 bg-[#E8E8E8] rounded-lg">
          <h2 className="text-3xl font-bold text-[#9B59B6] mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            <div className="bg-white p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 transform transition-transform">
              <h3 className="text-xl font-bold text-[#6A0DAD] mb-4">How can I get involved?</h3>
              <p className="text-[#7F7F7F] leading-relaxed">You can get involved by attending our events, participating in our mentorship programs, and connecting with our community of women entrepreneurs. Contact us to learn more about upcoming opportunities.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 transform transition-transform">
              <h3 className="text-xl font-bold text-[#6A0DAD] mb-4">What services do you offer?</h3>
              <p className="text-[#7F7F7F] leading-relaxed">We offer networking opportunities, mentorship programs, educational workshops, business resources, and access to our community of successful women entrepreneurs.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 transform transition-transform">
              <h3 className="text-xl font-bold text-[#6A0DAD] mb-4">Do you offer mentorship programs?</h3>
              <p className="text-[#7F7F7F] leading-relaxed">Yes! We have a comprehensive mentorship program that connects experienced entrepreneurs with those looking to grow their businesses. Contact us to learn more about our mentorship opportunities.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 transform transition-transform">
              <h3 className="text-xl font-bold text-[#6A0DAD] mb-4">How often do you hold events?</h3>
              <p className="text-[#7F7F7F] leading-relaxed">We hold monthly networking events, quarterly workshops, and annual conferences. Follow us on social media or contact us to stay updated on upcoming events.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 transform transition-transform">
              <h3 className="text-xl font-bold text-[#6A0DAD] mb-4">Is there a cost to participate?</h3>
              <p className="text-[#7F7F7F] leading-relaxed">Many of our events and programs are free or have minimal costs. Some specialized workshops may have fees. Contact us for specific pricing information.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 transform transition-transform">
              <h3 className="text-xl font-bold text-[#6A0DAD] mb-4">Do you offer corporate partnerships?</h3>
              <p className="text-[#7F7F7F] leading-relaxed">Yes, we offer corporate partnership opportunities for organizations that want to support women's professional development. Contact us for more information about partnership options.</p>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default ContactUs;
