import Link from 'next/link';

export default function HeroSection() {
  return (
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
  );
}
