
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import JourneySection from '@/components/JourneySection';
import PlanningSection from '@/components/PlanningSection';
import MemoriesSection from '@/components/MemoriesSection';
import ExploreSection from '@/components/ExploreSection';
import Footer from '@/components/Footer';
// import FooterSection from '@/components/FooterSection';
import WhyKafira from '@/components/WhyKafira';
import FAQSection from '@/components/FAQSection';
import UpcomingTrips from '@/components/UpcomingTrips';
import AllTrips from '@/components/AllTrips';
import InternationalTrips from '@/components/InternationalTrips';

export default function Home() {
  return (
    <main style={{ position: 'relative', background: '#fff'  }}>
      <Navbar />
      <HeroSection />
      {/* <JourneySection /> */}
      <UpcomingTrips />
    
      <PlanningSection />
      <InternationalTrips />
      <AllTrips />
      <ExploreSection />
      <WhyKafira />
      <MemoriesSection />

      {/* Placeholder for upcoming sections */}
      {/* <section id="about" style={{ minHeight: '100vh', background: '#0e0c0a', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <p style={{ fontFamily:'Playfair Display,serif', color:'rgba(201,168,76,0.4)', fontSize:24 }}>
          More sections coming soon…
        </p>
      </section> */}
      <FAQSection />
      <Footer />
    </main>
  );
}
