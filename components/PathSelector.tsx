import Link from 'next/link';

// Raw SVG Icons
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

export default function PathSelector() {
  const paths = [
    {
      title: 'Study Abroad',
      description: 'Find student visas and top university pathways.',
      href: '/study-abroad',
      Icon: GraduationCap, 
    },
    {
      title: 'Work Abroad',
      description: 'Explore sponsored jobs and skilled worker visas.',
      href: '/work-abroad',
      Icon: Briefcase,
    },
    {
      title: 'Relocate',
      description: 'Step-by-step guides for permanent residency.',
      href: '/start-here',
      Icon: Plane,
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto bg-white">
      <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">
        Choose Your Pathway
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paths.map((path) => {
          const IconComponent = path.Icon;
          return (
            <Link key={path.title} href={path.href} className="group block">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-md hover:border-blue-200 hover:bg-slate-50 flex flex-col items-center text-center h-full">
                <div className="mb-6 p-4 rounded-full bg-slate-50 group-hover:bg-blue-50 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-blue-600 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {path.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {path.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
