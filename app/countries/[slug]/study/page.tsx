import Link from 'next/link';

const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
);
const CheckCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default async function CountryStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formattedName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-slate-500">
          <Link className="hover:text-blue-600 transition-colors" href="/countries">Destinations</Link>
          <ChevronRight className="w-4 h-4 mx-2"/>
          <Link className="hover:text-blue-600 transition-colors" href={`/countries/${slug}`}>{formattedName}</Link>
          <ChevronRight className="w-4 h-4 mx-2"/>
          <span className="text-slate-900 font-medium">Study Guide</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <Link href={`/countries/${slug}`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to {formattedName} Overview
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-10">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 block">Student Pathway</span>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Study in {formattedName}</h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            A complete guide to securing your student visa, finding the right university, and navigating the application process for {formattedName}.
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-4 pt-6 border-t border-slate-100">Core Requirements</h2>
          <ul className="space-y-4 mb-8">
            {[
              'Valid Acceptance Letter from a recognized educational institution.',
              'Proof of financial support (tuition + living expenses).',
              'Language proficiency test scores (e.g., IELTS, TOEFL).',
              'Valid passport and clean background check.'
            ].map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-600">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [{ slug: 'canada' }, { slug: 'united-kingdom' }, { slug: 'germany' }, { slug: 'australia' }, { slug: 'united-states' }, { slug: 'new-zealand' }];
}
