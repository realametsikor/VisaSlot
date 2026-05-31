import Link from 'next/link';

// Raw SVGs
const GraduationCap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.42 10.922a2 2 0 0 0-.019-3.838L12.83 4.3a2 2 0 0 0-1.66 0L2.6 7.08a2 2 0 0 0 0 3.832l8.57 3.608a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
);
const Briefcase = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const Plane = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.6c-.1.4 0 .9.4 1.1L6 21l1.5 4.3c.2.4.7.5 1.1.4l1.4-.6c.4-.2.6-.7.5-1.1l-1-3 4-4 2.9 7c.2.4.7.6 1.1.5l3.6-1.2c.5-.2.8-.6.7-1.1z"/></svg>
);
const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);

export default function StartHerePage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="max-w-2xl text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Let's map out your journey.</h1>
        <p className="text-lg text-slate-500">
          Tell us what you want to achieve, and we will point you to the exact guides, checklists, and tools you need to make it happen.
        </p>
      </div>

      <div className="max-w-4xl w-full bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">What is your primary goal?</h2>
        
        {/* Goal Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Link href="/study-abroad" className="group p-6 border-2 border-slate-100 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all text-center flex flex-col items-center">
            <div className="p-4 bg-slate-50 rounded-full group-hover:bg-blue-100 mb-4 transition-colors">
              <GraduationCap className="w-8 h-8 text-slate-600 group-hover:text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-blue-700">Study Abroad</h3>
            <p className="text-sm text-slate-500 mt-2">Find universities and student visas.</p>
          </Link>

          <Link href="/work-abroad" className="group p-6 border-2 border-slate-100 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all text-center flex flex-col items-center">
            <div className="p-4 bg-slate-50 rounded-full group-hover:bg-blue-100 mb-4 transition-colors">
              <Briefcase className="w-8 h-8 text-slate-600 group-hover:text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-blue-700">Work Abroad</h3>
            <p className="text-sm text-slate-500 mt-2">Secure a job and a work permit.</p>
          </Link>

          <Link href="/countries" className="group p-6 border-2 border-slate-100 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all text-center flex flex-col items-center">
            <div className="p-4 bg-slate-50 rounded-full group-hover:bg-blue-100 mb-4 transition-colors">
              <Plane className="w-8 h-8 text-slate-600 group-hover:text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-blue-700">Relocate Permanently</h3>
            <p className="text-sm text-slate-500 mt-2">Explore PR and residency paths.</p>
          </Link>
        </div>

        {/* Quick Country Jump */}
        <div className="border-t border-slate-100 pt-8 text-center">
          <p className="text-slate-500 mb-4">Already know where you want to go?</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Canada', 'United Kingdom', 'Germany', 'Australia'].map((country) => (
              <Link 
                key={country} 
                href={`/countries/${country.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 hover:text-slate-900 transition-colors flex items-center gap-1"
              >
                {country} <ChevronRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
