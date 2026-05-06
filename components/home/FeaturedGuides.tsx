import Link from 'next/link';

export default function FeaturedGuides() {
  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Essential Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Link key={i} href="/blog/how-to-move-abroad" className="block bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-40 bg-slate-200 w-full"></div> {/* Image placeholder */}
              <div className="p-6">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Guide</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">The Ultimate Guide to Proving Proof of Funds</h3>
                <p className="text-sm text-slate-500 line-clamp-2">Learn exactly what immigration officers look for in your bank statements to avoid common rejection reasons.</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
