import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoCaretUp } from "react-icons/io5";

const faqs = [
  {
    question: "What is Women Business Circle?",
    answer:
      "Women Business Circle is a community of women entrepreneurs offering wellness services and handmade products that celebrate creativity, connection, and care.",
  },
  {
    question: "How can I become a member?",
    answer:
      "Simply visit our Join as a Member page and fill out the registration form. Once approved, your profile will appear on our homepage.",
  },
  {
    question: "Can I sell my products through WBC?",
    answer:
      "Yes! Members can showcase and sell their handmade or wellness products through our platform. We support you with visibility and community engagement.",
  },
  {
    question: "Is there a membership fee?",
    answer:
      "Yes, there is a membership fee to join the Women Business Circle. The joining fee is ₹10,000, which is a one-time payment to become a member.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6A0DAD] mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Here are answers to some common questions about our community,
          membership, and offerings.
        </p>

        <div className="space-y-6 text-left">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#F8F0FF] p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer"
              onClick={() => toggle(i)}
            >
              <h3 className="text-sm text-[#6A0DAD] mb-2 flex justify-between items-center">
                {faq.question}
                <span className="text-2xl">
                  {openIndex === i ? <FaCaretDown /> : <IoCaretUp />}
                </span>
              </h3>
              {openIndex === i && (
                <p className="text-gray-700 mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
