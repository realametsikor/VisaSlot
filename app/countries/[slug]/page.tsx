import Link from 'next/link';

// Raw SVGs for Icons
const GraduationCap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.42 10.922a2 2 0 0 0-.019-3.838L12.83 4.3a2 2 0 0 0-1.66 0L2.6 7.08a2 2 0 0 0 0 3.832l8.57 3.608a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
  </svg>
);

const Briefcase = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const Plane = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.6c-.1.4.1.9.5 1.1L10 14.5l-4 4-3-1c-.4-.1-.9.1-1.1.5l-.6 1.4c-.1.4 0 .9.4 1.1L6 21l1.5 4.3c.2.4.7.5 1.1.4l1.4-.6c.4-.2.6-.7.5-1.1l-1-3 4-4 2.9 7c.2.4.7.6 1.1.5l3.6-1.2c.5-.2.8-.6.7-1.1z"/>
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const Wallet = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default function CountryPage({ params }: { params: { slug: string } }) {
  // Format the slug into a readable name (e.g., "united-kingdom" -> "United Kingdom")
  const formattedName = params.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/countries" className="hover:text-blue-600 transition-colors">Destinations</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-slate-900 font-medium">{formattedName}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Relocate to {formattedName}
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Your comprehensive guide to moving, studying, and working in {formattedName}. Discover the best immigration pathways, requirements, and estimated costs to start your journey.
            </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto flex flex-col gap-3">
             <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-center">
              Check Eligibility
            </button>
             <button className="w-full md:w-auto px-8 py-3 bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm text-center">
              Download Guide (PDF)
            </button>
          </div>
        </div>

        {/* Quick Facts Grid */}
        <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Facts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Processing Time</p>
              <p className="text-slate-900 font-bold">2 - 8 Months</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Proof of Funds</p>
              <p className="text-slate-900 font-bold">$10k - $15k Avg.</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Work Rights</p>
              <p className="text-slate-900 font-bold">Up to 20hrs/week</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Language Test</p>
              <p className="text-slate-900 font-bold">Required (IELTS)</p>
            </div>
          </div>
        </div>

        {/* Pathways Section */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose Your Pathway</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Study Pathway */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Study in {formattedName}</h3>
            <p className="text-slate-500 mb-6 flex-grow">
              Information on student visas, university applications, tuition fees, and post-graduation work permits.
            </p>
            <Link href={`/countries/${params.slug}/study`} className="text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View Study Guide <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Work Pathway */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Work in {formattedName}</h3>
            <p className="text-slate-500 mb-6 flex-grow">
              Explore sponsored jobs, skilled worker visas, employer requirements, and high-demand occupations.
            </p>
            <Link href={`/countries/${params.slug}/work`} className="text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View Work Guide <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Relocate Pathway */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Plane className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Permanent Residency</h3>
            <p className="text-slate-500 mb-6 flex-grow">
              Step-by-step guidance on points-based systems, family sponsorship, and permanent relocation.
            </p>
            <Link href={`/countries/${params.slug}/relocate`} className="text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View PR Guide <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
// This tells Next.js to pre-build these specific country pages
export async function generateStaticParams() {
  return [
    { slug: 'canada' },
    { slug: 'united-kingdom' },
    { slug: 'germany' },
    { slug: 'australia' },
    { slug: 'united-states' },
    { slug: 'new-zealand' },
  ];
}
        </div>
      </div>
    </div>
  );
}
