import React from "react"
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"

import './globals.css'

const _spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const _inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Yvan Richani | Game Developer',
  description: 'Portfolio of Yvan Richani - Indie game developer, tool creator, and award-winning game designer. Explore games, tools, and achievements.',
  keywords: ['game developer', 'indie games', 'Unity', 'game design', 'Yvan Richani'],
  icons: [],
}

export const viewport: Viewport = {
  themeColor: '#22c997',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_spaceGrotesk.variable} ${_inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
