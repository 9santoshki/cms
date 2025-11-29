import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Montserrat } from 'next/font/google';
import { AppProvider } from '@/context/AppContext';
import '@fortawesome/fontawesome-free/css/all.css';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900']
});
const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Colour My Space - Interior Design & E-commerce',
  description: 'Premium interior design services and curated product collection',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} ${montserrat.variable}`}>
        <AppProvider>
          {children}
        </AppProvider>
        {/* This is the portal root for modals */}
        <div id="modal-root" />
      </body>
    </html>
  );
}
