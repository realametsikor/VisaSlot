import Link from 'next/link';

// Raw SVG Icons
const CalendarClock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.3V14"/><circle cx="16" cy="16" r="6"/>
  </svg>
);

const Calculator = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>
  </svg>
);

const ClipboardCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>
  </svg>
);

export default function ToolsSection() {
  const tools = [
    { title: 'Timeline Tracker', desc: 'Map out your application milestones.', Icon: CalendarClock },
    { title: 'Cost Calculator', desc: 'Estimate total visa and moving expenses.', Icon: Calculator },
    { title: 'Checklists', desc: 'Downloadable SOPs and document lists.', Icon: ClipboardCheck },
  ];

  return (
    <section className="py-16 px-4 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Free Resources & Tools</h2>
        <p className="text-slate-500 mb-10 max-w-2xl mx-auto">Stop guessing and start planning with our purpose-built immigration tools.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.Icon;
            return (
              <div key={tool.title} className="p-8 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center hover:border-blue-200 transition-colors">
                <div className="mb-4 p-3 rounded-xl bg-white shadow-sm border border-slate-100">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900">{tool.title}</h3>
                <p className="text-sm text-slate-500 mt-2">{tool.desc}</p>
                <Link href="/resources/tools" className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-700">Open Tool →</Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
