import './globals.css';
import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Colour My Space - Interior Design Studio',
  description: 'Premium interior design services and curated product collection. Transform your space with expert guidance from our experienced designers.',
  keywords: ['interior design', 'home decor', 'furniture', 'design studio', 'consultation'],
  authors: [{ name: 'Colour My Space' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Colour My Space',
    title: 'Colour My Space - Interior Design Studio',
    description: 'Premium interior design services and curated product collection. Transform your space with expert guidance.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Colour My Space - Interior Design Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Colour My Space - Interior Design Studio',
    description: 'Premium interior design services and curated product collection.',
    images: ['/og-image.svg'],
  },
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
