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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://uat.colourmyspace.com'),
  title: {
    default: 'Colour My Space - Interior Design Studio',
    template: '%s | Colour My Space',
  },
  description: 'Premium interior design services and curated product collection. Transform your space with expert guidance from our experienced designers in Indiranagar, Bengaluru.',
  keywords: [
    'interior design',
    'home decor',
    'furniture',
    'design studio',
    'consultation',
    'Bengaluru interior design',
    'Indiranagar design studio',
    'home renovation',
    'interior decorator',
  ],
  authors: [{ name: 'Colour My Space' }],
  creator: 'Colour My Space',
  publisher: 'Colour My Space',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Colour My Space',
    title: 'Colour My Space - Interior Design Studio',
    description: 'Premium interior design services and curated product collection. Transform your space with expert guidance.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Colour My Space - Interior Design Studio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@colourmyspace',
    creator: '@colourmyspace',
    title: 'Colour My Space - Interior Design Studio',
    description: 'Premium interior design services and curated product collection.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo.svg',
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
