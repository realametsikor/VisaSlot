import './globals.css'; // <-- This is the magic line that restores your Tailwind styling!
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
