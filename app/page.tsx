import PathSelector from '@/components/PathSelector';
import HeroSection from '@/components/home/HeroSection';
import PopularCountries from '@/components/home/PopularCountries';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. HERO SECTION (Modular) */}
      <HeroSection />

      {/* 2. PATH SELECTOR SECTION (Modular) */}
      <div className="bg-slate-50">
        <PathSelector />
      </div>

      {/* 3. POPULAR COUNTRIES SECTION (Modular) */}
      <PopularCountries />

      {/* 4. FEATURED GUIDES SECTION (To be extracted next) */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Essential Reading</h2>
          {/* ... existing guides code ... */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/how-to-move-abroad" className="block bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-40 bg-slate-200 w-full"></div>
              <div className="p-6">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Guide</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">The Ultimate Guide to Proving Proof of Funds</h3>
                <p className="text-sm text-slate-500 line-clamp-2">Learn exactly what immigration officers look for in your bank statements to avoid common rejection reasons.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. REAL STORIES SECTION (To be extracted next) */}
      <section className="bg-blue-600 py-16 px-4 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Real Journeys</h2>
          {/* ... existing stories code ... */}
        </div>
      </section>

      {/* 6. TOOLS SECTION (To be extracted next) */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Free Resources & Tools</h2>
          {/* ... existing tools code ... */}
        </div>
      </section>

      {/* 7. FOOTER */}
      {/* (We will extract this into components/Footer.tsx next) */}
      
    </div>
  );
}
