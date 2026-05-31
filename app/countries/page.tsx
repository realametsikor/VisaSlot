import Link from 'next/link';

// Raw SVGs for icons
const MapPin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function CountriesDirectory() {
  const countries = [
    { name: 'Canada', slug: 'canada', description: 'Explore Express Entry, study permits, and provincial nominee programs.' },
    { name: 'United Kingdom', slug: 'united-kingdom', description: 'Navigate the points-based system, student visas, and healthcare pathways.' },
    { name: 'Germany', slug: 'germany', description: 'Learn about the Opportunity Card, Blue Card, and studying for free.' },
    { name: 'Australia', slug: 'australia', description: 'Discover skilled independent visas and regional sponsored migration.' },
    { name: 'United States', slug: 'united-states', description: 'Guides on H-1B, F-1 student visas, and the Diversity Visa lottery.' },
    { name: 'New Zealand', slug: 'new-zealand', description: 'Pathways for skilled migrants and working holiday makers.' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Destinations</h1>
          <p className="mt-3 text-lg text-slate-500 max-w-2xl">
            Choose a country below to explore tailored visa guides, cost of living estimates, and relocation pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Link 
              key={country.slug} 
              href={`/countries/${country.slug}`}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 group flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {country.name}
                </h2>
              </div>
              <p className="text-slate-500 text-sm flex-grow">
                {country.description}
              </p>
              <div className="mt-6 text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Pathways 
                <span aria-hidden="true">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
