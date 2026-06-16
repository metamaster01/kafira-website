import AboutHero         from '@/components/about/AboutHero';
import AboutVisionMission from '@/components/about/AboutVisionMIssion';
import AboutWhyUs         from '@/components/about/AboutWhyUs';
import AboutProcess       from '@/components/about/AboutProcess';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import MeetTeam from '@/components/about/Meetteam';
import AboutStory from '@/components/about/AboutStory';
import CTABanner from '@/components/CTABanner';
import TakeABreak from '@/components/TakeABreak';
import OfficeLocations from '@/components/about/OfficeAddress';

export const metadata = {
  title: 'About Kafira — Crafting Extraordinary Journeys',
  description: 'Since 2012, Kafira has been building handcrafted travel experiences across India and beyond for 50,000+ travelers.',
};

export default function AboutPage() {
  return (
    <main>
        <Navbar />
      <AboutHero/>
      <AboutStory />
      <WhyChooseUs />
      <MeetTeam />
      <OfficeLocations />
      <TakeABreak />
      <CTABanner />
      {/* <AboutVisionMission/> */}
      {/* <AboutWhyUs/> */}
      {/* <AboutProcess/> */}
      {/* <FAQSection /> */}
      <Footer />
    </main>
  );
}