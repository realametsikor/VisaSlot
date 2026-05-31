import HeroSection from '../components/home/HeroSection';
import PathSelector from '../components/PathSelector';
import PopularCountries from '../components/home/PopularCountries';
import FeaturedGuides from '../components/home/FeaturedGuides';
import RealStories from '../components/home/RealStories';
import ToolsSection from '../components/home/ToolsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <HeroSection />
      <PathSelector />
      <PopularCountries />
      <FeaturedGuides />
      <RealStories />
      <ToolsSection />
    </main>
  );
}
