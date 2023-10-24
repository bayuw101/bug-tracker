import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import './theme-config.css'
import './globals.css'
import NavBar from './NavBar'
import { Container, Theme, ThemePanel } from '@radix-ui/themes';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Simple Issue Tracker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
      <Theme accentColor="cyan" scaling="95%">
          <NavBar />
          <main className='p-5'>
            <Container>
              {children}
            </Container>
          </main>
        </Theme>
      </body>
    </html>
  )
}
