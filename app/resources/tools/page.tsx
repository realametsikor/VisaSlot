import Link from 'next/link';

// Raw SVGs
const Calculator = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>
  </svg>
);

const CalendarClock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.3V14"/><circle cx="16" cy="16" r="6"/>
  </svg>
);

const ClipboardCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>
  </svg>
);

const Download = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default function ToolsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Immigration Tools & Calculators
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Take the guesswork out of your relocation. Use our free interactive tools to estimate costs, track your application timeline, and ensure you have all the right documents.
          </p>
        </div>
      </div>

      {/* Main Interactive Tools */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Cost Calculator Tool Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Calculator className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Cost Calculator</h2>
            </div>
            <p className="text-slate-500 mb-8 flex-grow">
              Input your destination country, family size, and visa type to generate a comprehensive estimate of your total relocation expenses, including proof of funds, flight averages, and government fees.
            </p>
            <button className="w-full py-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm flex justify-center items-center gap-2">
              Launch Calculator <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline Tracker Tool Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <CalendarClock className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Timeline Tracker</h2>
            </div>
            <p className="text-slate-500 mb-8 flex-grow">
              Build a personalized roadmap. Select your target move date and visa pathway, and we will automatically map out when you need to take language tests, submit applications, and book flights.
            </p>
            <button className="w-full py-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm flex justify-center items-center gap-2">
              Create My Timeline <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Downloadable Checklists Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Essential Checklists</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Student Visa Document List', desc: 'Everything you need for your university and visa application.' },
            { title: 'Skilled Worker PR Checklist', desc: 'Ensure you don\'t miss a single form for Express Entry or points-based systems.' },
            { title: 'Pre-Departure Packing Guide', desc: 'What to pack, what to sell, and what to leave behind.' }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-200 transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-50 rounded-lg text-slate-600 group-hover:text-blue-600 transition-colors">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <button className="text-slate-400 hover:text-blue-600 transition-colors" aria-label="Download PDF">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
