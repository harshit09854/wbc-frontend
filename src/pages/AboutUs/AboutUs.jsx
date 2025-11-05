// Tailwind applied

import HeroSection from "./Herosection"
import OurStorySection from "./OurStorySection"
import StatsSection from "./StateSection"
import ContactSection from "./ContactSection"


const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F0FF] to-white pt-20">
      <HeroSection />
      <StatsSection />
      <OurStorySection />
      <ContactSection />
    </div>
  )
}

export default AboutUs
