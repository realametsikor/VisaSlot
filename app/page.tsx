import Link from 'next/link';
import PathSelector from '@/components/PathSelector';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
          {/* Left Side: Content */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              Move abroad with clarity—<span className="text-blue-600">not guesswork.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
              Your comprehensive guide to studying, working, and relocating internationally. Stop searching through forums and start your journey with structured, reliable pathways.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <Link href="/start-here" className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                Start Here
              </Link>
              <Link href="/countries" className="w-full sm:w-auto px-8 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-slate-50 transition-colors shadow-sm">
                Explore Countries
              </Link>
            </div>
          </div>

          {/* Right Side: Dashboard UI Mock Visual */}
          <div className="flex-1 w-full max-w-md bg-slate-50 rounded-2xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
            <div className="space-y-4 relative z-10">
              <div className="h-4 w-1/3 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-24 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center px-4 gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-1/2 bg-slate-200 rounded"></div>
                  <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                </div>
              </div>
              <div className="h-24 bg-white rounded-xl border border-slate-100 shadow-sm opacity-60 flex items-center px-4 gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold">2</div>
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-1/2 bg-slate-200 rounded"></div>
                  <div className="h-2 w-full bg-slate-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PATH SELECTOR SECTION */}
      <div className="bg-slate-50">
        <PathSelector />
      </div>

      {/* 3. POPULAR COUNTRIES SECTION */}
      <section className="bg-white py-16 px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Popular Destinations</h2>
              <p className="text-slate-500 mt-2">Explore requirements and pathways by country.</p>
            </div>
            <Link href="/countries" className="hidden sm:block text-blue-600 hover:underline font-medium">View All →</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Canada', flag: '🇨🇦', hook: 'High demand for skilled workers.' },
              { name: 'United Kingdom', flag: '🇬🇧', hook: 'Top universities & healthcare visas.' },
              { name: 'Germany', flag: '🇩🇪', hook: 'Opportunity card now available.' },
              { name: 'Australia', flag: '🇦🇺', hook: 'Points-based PR system.' },
            ].map((country) => (
              <Link key={country.name} href={`/countries/${country.name.toLowerCase().replace(' ', '-')}`} className="group bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{country.flag}</div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{country.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{country.hook}</p>
              </Link>
            ))}
          </div>
          <Link href="/countries" className="block sm:hidden text-center text-blue-600 mt-6 font-medium">View All Countries →</Link>
        </div>
      </section>

      {/* 4. FEATURED GUIDES SECTION */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Essential Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Link key={i} href="/blog/how-to-move-abroad" className="block bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-shadow">
                <div className="h-40 bg-slate-200 w-full"></div> {/* Image placeholder */}
                <div className="p-6">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Guide</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">The Ultimate Guide to Proving Proof of Funds</h3>
                  <p className="text-sm text-slate-500 line-clamp-2">Learn exactly what immigration officers look for in your bank statements to avoid common rejection reasons.</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REAL STORIES SECTION */}
      <section className="bg-blue-600 py-16 px-4 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Real Journeys</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-blue-700/50 p-6 rounded-2xl border border-blue-500">
              <p className="italic text-blue-50">"VisaSlot's document checklist saved me from submitting an incomplete application for my UK Student Visa. I got approved in 2 weeks!"</p>
              <div className="mt-4 font-medium text-sm text-blue-200">— Sarah, Study Abroad</div>
            </div>
            <div className="bg-blue-700/50 p-6 rounded-2xl border border-blue-500">
              <p className="italic text-blue-50">"I was overwhelmed by the Canadian Express Entry system. The step-by-step breakdown made it manageable to do myself without an agent."</p>
              <div className="mt-4 font-medium text-sm text-blue-200">— David, Relocated to Toronto</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TOOLS SECTION */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Free Resources & Tools</h2>
          <p className="text-slate-500 mb-10 max-w-2xl mx-auto">Stop guessing and start planning with our purpose-built immigration tools.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Timeline Tracker', desc: 'Map out your application milestones.', icon: '📅' },
              { title: 'Cost Calculator', desc: 'Estimate total visa and moving expenses.', icon: '💰' },
              { title: 'Checklists', desc: 'Downloadable SOPs and document lists.', icon: '✅' },
            ].map((tool) => (
              <div key={tool.title} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
                <span className="text-3xl mb-3">{tool.icon}</span>
                <h3 className="font-bold text-slate-900">{tool.title}</h3>
                <p className="text-sm text-slate-500 mt-2">{tool.desc}</p>
                <Link href="/resources/tools" className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">Open Tool →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-900 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold text-white">VisaSlot</span>
            <p className="text-slate-400 text-sm mt-4">Move abroad with clarity.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Pathways</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/study-abroad" className="hover:text-white">Study Abroad</Link></li>
              <li><Link href="/work-abroad" className="hover:text-white">Work Abroad</Link></li>
              <li><Link href="/start-here" className="hover:text-white">Relocate</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/countries" className="hover:text-white">Country Guides</Link></li>
              <li><Link href="/resources/tools" className="hover:text-white">Tools & Calculators</Link></li>
              <li><Link href="/blog" className="hover:text-white">Articles & News</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} VisaSlot. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
