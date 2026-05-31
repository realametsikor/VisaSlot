import Link from 'next/link';

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Format the URL slug into a readable title
  const formattedTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to all guides
        </Link>
        
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {formattedTitle}
          </h1>
          
          <div className="flex items-center gap-3 mb-10 pb-10 border-b border-slate-100">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">VS</div>
            <div>
              <p className="text-sm font-medium text-slate-900">VisaSlot Editorial Team</p>
              <p className="text-xs text-slate-500">Published on May 15, 2026</p>
            </div>
          </div>
          
          {/* Article Content */}
          <div className="prose prose-slate prose-lg max-w-none text-slate-600 space-y-6">
            <p>Moving abroad is one of the most exciting decisions you can make, but the immigration process requires careful planning and attention to detail. This guide covers everything you need to know about preparing your application to avoid common pitfalls.</p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Understanding the Core Requirements</h2>
            <p>Every country has its own specific set of rules. However, the foundational documents usually remain the same across the board. Preparing these early will save you months of delays:</p>
            
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>A valid passport with at least 6 months of validity beyond your intended stay.</li>
              <li>Consolidated proof of financial means (bank statements, sponsorships, or pay slips).</li>
              <li>A clean criminal record check from your home country.</li>
              <li>Certified translations of any documents not in the destination's official language.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Next Steps in Your Journey</h2>
            <p>Make sure you consult our country-specific guides to get the exact financial thresholds and requirements for your chosen destination. Do not rush the document gathering phase—accuracy and consistency are much more important than speed.</p>
          </div>
        </article>
      </div>
    </div>
  );
}

// Tells Next.js to pre-build these specific article URLs for Vercel
export async function generateStaticParams() {
  return [
    { slug: 'how-to-move-abroad' },
    { slug: 'tech-workers-guide' },
    { slug: 'writing-an-sop' }
  ];
}
