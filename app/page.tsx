import HeroSection from '../components/HeroSection';
import PathSelector from '../components/PathSelector';
import PopularCountries from '../components/PopularCountries';
import FeaturedGuides from '../components/FeaturedGuides';
import RealStories from '../components/RealStories';
import ToolsSection from '../components/ToolsSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <HeroSection />
      <PathSelector />
      <PopularCountries />
      <FeaturedGuides />
      <RealStories />
      <ToolsSection />
      <Footer />
    </main>
  );
}
