import Link from 'next/link';

// Raw SVGs
const Search = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>
  </svg>
);

const Landmark = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default function StudyAbroadPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Your Global Education Starts Here
          </h1>
          <p className="text-lg text-slate-500 mb-10 leading-relaxed">
            Navigate university applications, secure scholarships, and understand student visa requirements with our comprehensive study abroad guides.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/countries" className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
              Find a University
            </Link>
            <Link href="/resources/tools" className="px-8 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
              Calculate Costs
            </Link>
          </div>
        </div>
      </div>

      {/* The 3-Step Process */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">The Application Journey</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-slate-200 z-0"></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-sm flex items-center justify-center mb-6 group-hover:border-blue-100 transition-colors">
              <Search className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">1. Research & Shortlist</h3>
            <p className="text-slate-500 text-sm">
              Find programs that align with your career goals and budget. Check admission requirements and deadlines.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-sm flex items-center justify-center mb-6 group-hover:border-blue-100 transition-colors">
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">2. Prepare Documents</h3>
            <p className="text-slate-500 text-sm">
              Gather your transcripts, write a compelling Statement of Purpose (SOP), and take necessary language tests (IELTS/TOEFL).
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-sm flex items-center justify-center mb-6 group-hover:border-blue-100 transition-colors">
              <Landmark className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">3. Apply & Visa</h3>
            <p className="text-slate-500 text-sm">
              Submit your university applications. Once accepted, organize your Proof of Funds and apply for your student visa.
            </p>
          </div>
        </div>
      </div>

      {/* Top Student Destinations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Top Student Destinations</h2>
          <Link href="/countries" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Canada', 'United Kingdom', 'United States', 'Germany'].map((country) => (
            <Link key={country} href={`/countries/${country.toLowerCase().replace(' ', '-')}`} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{country}</h3>
              <p className="text-sm text-slate-500 mb-4">Explore university requirements and study permits.</p>
              <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                Study Guide <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
