import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Note: If you have a global CSS file for Tailwind (like globals.css), 
// you would normally import it here at the very top like this: 
// import './globals.css';

export const metadata = {
  title: 'VisaSlot | Move abroad with clarity',
  description: 'Your comprehensive guide to studying, working, and relocating internationally.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased min-h-screen flex flex-col">
        {/* The Navbar will now appear on every page */}
        <Navbar />
        
        {/* The 'children' represents whatever page the user is currently looking at */}
        <main className="flex-grow">
          {children}
        </main>

        {/* The Footer will now appear at the bottom of every page */}
        <Footer />
      </body>
    </html>
  );
}
