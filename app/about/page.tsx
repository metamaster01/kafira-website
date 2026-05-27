import AboutHero         from '@/components/about/AboutHero';
import AboutVisionMission from '@/components/about/AboutVisionMIssion';
import AboutWhyUs         from '@/components/about/AboutWhyUs';
import AboutProcess       from '@/components/about/AboutProcess';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';

export const metadata = {
  title: 'About Kafira — Crafting Extraordinary Journeys',
  description: 'Since 2012, Kafira has been building handcrafted travel experiences across India and beyond for 50,000+ travelers.',
};

export default function AboutPage() {
  return (
    <main>
        <Navbar />
      <AboutHero/>
      <AboutVisionMission/>
      <AboutWhyUs/>
      <AboutProcess/>
      <FAQSection />
      <Footer />
    </main>
  );
}