import Link from 'next/link';

export default function ToolsSection() {
  const tools = [
    { title: 'Timeline Tracker', desc: 'Map out your application milestones.', icon: '📅' },
    { title: 'Cost Calculator', desc: 'Estimate total visa and moving expenses.', icon: '💰' },
    { title: 'Checklists', desc: 'Downloadable SOPs and document lists.', icon: '✅' },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Free Resources & Tools</h2>
        <p className="text-slate-500 mb-10 max-w-2xl mx-auto">Stop guessing and start planning with our purpose-built immigration tools.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
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
  );
}
