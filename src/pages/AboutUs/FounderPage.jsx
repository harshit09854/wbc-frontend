import { ChevronRight, Award, Users, Heart, Target } from "lucide-react";
// import founder from "../../assets/founder.webp";
import founder from "../../assets/founder.jpeg";

const FounderPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F0FF] to-white pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6A0DAD] to-[#B24592] py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Visionary Behind the{" "}
              <span className="text-white font-extrabold">
                Business Revolution
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Meet the passionate leader who transformed her vision into a
              movement that has touched thousands of lives
            </p>
          </div>
        </div>
      </section>

      {/* Founder Profile Section */}
      <section className="py-20 -mt-16">
        <div className="container mx-auto px-2 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-[#F8F0FF] rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <img
                  src={founder}
                  alt="Meenakshi Paliwal - Founder"
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
              {/* Stats Card Overlay */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 border-l-4 border-[#6A0DAD]">
                <div className="flex items-center space-x-3">
                  <Heart className="h-8 w-8 text-[#6A0DAD]" />
                  <div>
                    <p className="text-2xl font-bold text-[#2E2E2E]">1000+</p>
                    <p className="text-sm text-[#7F7F7F]">Lives Transformed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-[#2E2E2E] mb-4">
                  Meet{" "}
                  <span className="text-[#6A0DAD] bold ">
                    Acharya Anima Goswami
                  </span>
                </h2>
                <div className="space-y-2 mb-6">
                  <p className="text-lg font-semibold text-[#2E2E2E]">
                    The Founder - Women Business Circle
                  </p>
                  <p className="text-lg font-semibold text-[#2E2E2E]">
                    Astro-Vastu Expert
                  </p>
                  <p className="text-lg  text-[#2E2E2E]">
                    Acharya Anima Goswami is the visionary founder of Women
                    Business Circle (WBC). With her leadership, WBC has become a
                    trusted space for women professionals to turn ideas into
                    thriving businesses. She brings a rare combination of
                    spiritual wisdom and entrepreneurial insight to her role,
                    creating an environment where business goals and personal
                    growth go hand-in-hand. Under her guidance, WBC emphasizes
                    integrity, collaboration, and self-empowerment, enabling
                    women to navigate the business world with resilience and
                    purpose.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-[#F8F0FF] rounded-xl">
                  <div className="text-3xl font-bold text-[#6A0DAD]">10+</div>
                  <div className="text-sm text-[#7F7F7F]">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-green-100 rounded-xl">
                  <div className="text-3xl font-bold text-[#2ECC71]">4</div>
                  <div className="text-sm text-[#7F7F7F]">Startups Founded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-[#E8E8E8]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#9B59B6] mb-4">
              Today, she stands tall as:
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#F8F0FF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#6A0DAD]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">""</h3>
            </div>

            <div className="text-center bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-[#2ECC71]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">""</h3>
            </div>

            <div className="text-center bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#F8F0FF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#6A0DAD]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">""</h3>
            </div>

            <div className="text-center bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-[#2ECC71]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">""</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-[#9B59B6] mb-16">
              The Impact Story
            </h2>

            <div className="space-y-8 text-lg text-[#7F7F7F] leading-relaxed">
              <p>
                Through her coaching, online platforms, and wellness camps,
                Meenakshi has changed over 1000 lives across India, offering
                practical, natural, and empowering fitness solutions. She
                continues to balance her tech skills with purpose-driven
                wellness innovations—also managing part-time IT projects to stay
                ahead in both worlds.
              </p>

              <p>
                Her mission is simple yet profound: Make India healthier,
                stronger, and more self-aware—one person at a time.
              </p>

              <p>
                She has received numerous awards and milestones, but for
                Meenakshi, the true reward lies in the stories of people
                reclaiming their health, energy, and confidence.
              </p>
            </div>

            {/* Quote Section */}
            <div>
              <div className="bg-purple-50/60 p-6 md:p-8 rounded-xl border-l-4 border-[#6A0DAD] shadow-sm">
                <p className="text-lg text-gray-700 mb-4 leading-relaxed italic">
                  “When I founded the
                  <span className="font-semibold text-[#6A0DAD]">
                    {" "}
                    Women Business Circle
                  </span>
                  , I envisioned a space where women could transform creativity
                  into purpose and purpose into prosperity.”
                </p>

                <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                  “Empowered women empower communities — and that’s our everyday
                  mission.”
                </p>

                <h3 className="text-xl font-semibold text-[#6A0DAD] mt-4">
                  — Acharya Anima Goswami
                </h3>
                <p className="text-gray-600 text-base">
                  Founder, Women Business Circle
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fit India Ambassador Badge */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-[#F39C12]" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-[#2E2E2E]">
                  Proudly, a Fit India Ambassador
                </p>
                <p className="text-sm text-[#7F7F7F]">For Rajasthan</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FounderPage;
