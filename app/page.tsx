import PathSelector from '@/components/PathSelector';
import HeroSection from '@/components/home/HeroSection';
import PopularCountries from '@/components/home/PopularCountries';
import FeaturedGuides from '@/components/home/FeaturedGuides';
import RealStories from '@/components/home/RealStories';
import ToolsSection from '@/components/home/ToolsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <HeroSection />
      
      <div className="bg-slate-50">
        <PathSelector />
      </div>

      <PopularCountries />
      <FeaturedGuides />
      <RealStories />
      <ToolsSection />
      <Footer />
    </div>
  );
}
