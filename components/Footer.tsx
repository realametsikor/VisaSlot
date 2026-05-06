import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-12 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <span className="text-2xl font-bold text-white">VisaSlot</span>
          <p className="text-slate-400 text-sm mt-4">Move abroad with clarity.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Pathways</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/study-abroad" className="hover:text-white">Study Abroad</Link></li>
            <li><Link href="/work-abroad" className="hover:text-white">Work Abroad</Link></li>
            <li><Link href="/start-here" className="hover:text-white">Relocate</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/countries" className="hover:text-white">Country Guides</Link></li>
            <li><Link href="/resources/tools" className="hover:text-white">Tools & Calculators</Link></li>
            <li><Link href="/blog" className="hover:text-white">Articles & News</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-white">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} VisaSlot. All rights reserved.
      </div>
    </footer>
  );
}
