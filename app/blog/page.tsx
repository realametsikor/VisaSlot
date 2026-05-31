import Link from 'next/link';

const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default function BlogDirectory() {
  const posts = [
    { title: 'The Ultimate Guide to Proving Proof of Funds', slug: 'how-to-move-abroad', excerpt: 'Learn exactly what immigration officers look for in your bank statements to avoid common rejection reasons.', category: 'Guide' },
    { title: 'Top 10 English-Speaking Countries for Tech Workers', slug: 'tech-workers-guide', excerpt: 'Discover which countries are actively fast-tracking visas for software engineers and IT professionals.', category: 'Career' },
    { title: 'How to Write a Winning Statement of Purpose', slug: 'writing-an-sop', excerpt: 'A step-by-step breakdown of how to structure your SOP for university admissions and study permits.', category: 'Study' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Immigration Guides & Insights</h1>
        <p className="text-lg text-slate-500 mb-12">Expert advice, policy updates, and step-by-step relocation guides.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col h-full">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">{post.category}</span>
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h2>
              <p className="text-slate-500 text-sm mb-6 flex-grow">{post.excerpt}</p>
              <span className="text-blue-600 font-medium flex items-center gap-1 text-sm group-hover:gap-2 transition-all">
                Read Article <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
