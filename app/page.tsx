import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
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
      <section className="py-10 px-4 max-w-7xl mx-auto bg-slate-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Choose Your Pathway
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Study Abroad', desc: 'Find student visas and top university pathways.', href: '/study-abroad', icon: '🎓' },
            { title: 'Work Abroad', desc: 'Explore sponsored jobs and skilled worker visas.', href: '/work-abroad', icon: '💼' },
            { title: 'Relocate', desc: 'Step-by-step guides for permanent residency.', href: '/start-here', icon: '✈️' },
          ].map((path) => (
            <Link key={path.title} href={path.href} className="group block">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md hover:border-blue-200 flex flex-col items-center text-center h-full">
                <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">{path.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{path.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{path.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-slate-900 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-2xl font-bold text-white">VisaSlot</span>
          <p className="text-slate-400 text-sm mt-4">Move abroad with clarity.</p>
          <div className="mt-8 pt-8 border-t border-slate-800 text-sm text-slate-500">
            © {new Date().getFullYear()} VisaSlot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
