import Link from 'next/link';

export default function CountryPage({ params }: { params: { slug: string } }) {
  // Mock data based on the slug (we will replace this with Supabase data later)
  const countryData = {
    name: 'Canada',
    flag: '🇨🇦',
    summary: 'A highly sought-after destination with robust express entry pathways and a strong demand for skilled workers in tech, healthcare, and trades.',
    quickInfo: {
      cost: '$15,000 - $20,000 CAD',
      time: '6 - 12 Months',
      difficulty: 'Medium',
      pr: 'High Possibility'
    },
    realityCheck: "The housing market in major cities like Toronto and Vancouver is extremely expensive. Ensure you have a realistic budget for your first 6 months to avoid financial stress."
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      
      {/* Navigation - Always returning the user to the list of options */}
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <Link href="/countries" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2 transition-colors">
          <span>&larr;</span> Back to all countries
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-12">
        
        {/* 1. HEADER SECTION */}
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{countryData.flag}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              {countryData.name}
            </h1>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
            {countryData.summary}
          </p>
        </header>

        {/* 2. QUICK INFO BAR */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Avg. Cost', value: countryData.quickInfo.cost, icon: '💰' },
            { label: 'Processing Time', value: countryData.quickInfo.time, icon: '⏱️' },
            { label: 'Difficulty', value: countryData.quickInfo.difficulty, icon: '📊' },
            { label: 'PR Possibility', value: countryData.quickInfo.pr, icon: '🌟' },
          ].map((info) => (
            <div key={info.label} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1 hover:border-blue-200 transition-colors">
              <span className="text-xl mb-1">{info.icon}</span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{info.label}</span>
              <span className="text-sm font-bold text-slate-900">{info.value}</span>
            </div>
          ))}
        </section>

        {/* 8. REALITY CHECK SECTION */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4 items-start shadow-sm">
          <span className="text-2xl mt-1">⚠️</span>
          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-1">Reality Check</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              {countryData.realityCheck}
            </p>
          </div>
        </section>

        {/* Placeholder where we will insert Part 2 */}
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-500 text-sm">
          Part 2: Visa Types, Timeline Visualization, Requirements, and Steps will go here.
        </div>

      </main>
    </div>
  );
}
