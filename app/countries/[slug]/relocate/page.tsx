import Link from 'next/link';

const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
);
const FileText = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
);

export default async function CountryRelocatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formattedName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-slate-500">
          <Link className="hover:text-blue-600 transition-colors" href="/countries">Destinations</Link>
          <ChevronRight className="w-4 h-4 mx-2"/>
          <Link className="hover:text-blue-600 transition-colors" href={`/countries/${slug}`}>{formattedName}</Link>
          <ChevronRight className="w-4 h-4 mx-2"/>
          <span className="text-slate-900 font-medium">PR Guide</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <Link href={`/countries/${slug}`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to {formattedName} Overview
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-10">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 block">Permanent Residency</span>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Relocate to {formattedName}</h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            Long-term immigration strategies. Explore points-based immigration systems, family sponsorships, and permanent residency options for {formattedName}.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-slate-200 rounded-2xl p-6">
              <FileText className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Points-Based Systems</h3>
              <p className="text-sm text-slate-600">Calculated based on your age, education level, work experience, and language proficiency.</p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-6">
              <FileText className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Family Sponsorship</h3>
              <p className="text-sm text-slate-600">Pathways for spouses, dependent children, and parents of permanent residents or citizens.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [{ slug: 'canada' }, { slug: 'united-kingdom' }, { slug: 'germany' }, { slug: 'australia' }, { slug: 'united-states' }, { slug: 'new-zealand' }];
}
