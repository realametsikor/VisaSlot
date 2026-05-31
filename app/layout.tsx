import './globals.css'; // <-- This is the magic line that restores your Tailwind styling!
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  metadataBase: new URL('https://www.visaslot.com'),
  title: {
    default: 'VisaSlot | Move abroad with clarity',
    template: '%s | VisaSlot',
  },
  description: 'Your comprehensive guide to studying, working, and relocating internationally. Explore visa requirements, cost calculators, and step-by-step immigration pathways.',
  keywords: ['visa guide', 'move abroad', 'immigration', 'study abroad', 'work abroad', 'relocation', 'student visa', 'work permit'],
  authors: [{ name: 'VisaSlot Editorial Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.visaslot.com',
    siteName: 'VisaSlot',
    title: 'VisaSlot | Move abroad with clarity',
    description: 'Your comprehensive guide to studying, working, and relocating internationally.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VisaSlot | Move abroad with clarity',
    description: 'Your comprehensive guide to studying, working, and relocating internationally.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://www.visaslot.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
