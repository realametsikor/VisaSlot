import Link from 'next/link';

export default function PopularCountries() {
  const countries = [
    { name: 'Canada', flag: '🇨🇦', hook: 'High demand for skilled workers.' },
    { name: 'United Kingdom', flag: '🇬🇧', hook: 'Top universities & healthcare visas.' },
    { name: 'Germany', flag: '🇩🇪', hook: 'Opportunity card now available.' },
    { name: 'Australia', flag: '🇦🇺', hook: 'Points-based PR system.' },
  ];

  return (
    <section className="bg-white py-16 px-4 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Popular Destinations</h2>
            <p className="text-slate-500 mt-2">Explore requirements and pathways by country.</p>
          </div>
          <Link href="/countries" className="hidden sm:block text-blue-600 hover:underline font-medium">View All →</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <Link key={country.name} href={`/countries/${country.name.toLowerCase().replace(' ', '-')}`} className="group bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
              <div className="text-4xl mb-4">{country.flag}</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{country.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{country.hook}</p>
            </Link>
          ))}
        </div>
        <Link href="/countries" className="block sm:hidden text-center text-blue-600 mt-6 font-medium">View All Countries →</Link>
      </div>
    </section>
  );
}
