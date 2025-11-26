import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display, Montserrat } from 'next/font/google'
import { AppProvider } from '@/context/AppContext'
import { NextAuthProvider } from '@/components/NextAuthProvider';
import Script from 'next/script';

// Import Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.css'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900']
})
const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Colour My Space - Interior Design & E-commerce',
  description: 'Premium interior design services and curated product collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Note: Replace with your actual Google Client ID
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
  
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} ${montserrat.variable}`}>
        <NextAuthProvider>
          <AppProvider>{children}</AppProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}