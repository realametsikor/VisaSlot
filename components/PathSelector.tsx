import Link from 'next/link';

export default function PathSelector() {
  const paths = [
    {
      title: 'Study Abroad',
      description: 'Find student visas and top university pathways.',
      href: '/study-abroad',
      icon: '🎓', // Using simple emojis for now to keep your mobile setup lightweight
    },
    {
      title: 'Work Abroad',
      description: 'Explore sponsored jobs and skilled worker visas.',
      href: '/work-abroad',
      icon: '💼',
    },
    {
      title: 'Relocate',
      description: 'Step-by-step guides for permanent residency.',
      href: '/start-here',
      icon: '✈️',
    },
  ];

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Choose Your Pathway
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paths.map((path) => (
          <Link key={path.title} href={path.href} className="group block">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md hover:border-blue-200 flex flex-col items-center text-center h-full">
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {path.icon}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {path.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {path.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
