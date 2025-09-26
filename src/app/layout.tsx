import type { Metadata, Viewport } from 'next'
import { Figtree, Instrument_Serif } from 'next/font/google'
import { GeistMono } from "geist/font/mono"
import './globals.css'
import { Footer } from '@/components/layout/Footer'
import { getSiteConfigServer } from '@/lib/server-config'

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "block", // 使用block避免布局偏移
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "block", // 使用block避免布局偏移
  preload: true,
  fallback: ['Georgia', 'Times', 'serif'],
})

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfigServer()
  
  return {
    title: config.siteTitle,
    description: config.siteDescription,
    keywords: config.siteMetadata.keywords,
    authors: [{ name: config.siteMetadata.author }],
    creator: config.siteMetadata.author,
    icons: {
      icon: [
        { url: config.siteIcon?.icon16 || '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: config.siteIcon?.icon32 || '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      shortcut: config.siteIcon?.favicon || '/favicon.ico',
      apple: config.siteIcon?.appleTouchIcon || '/apple-touch-icon.png',
    },
    openGraph: {
      title: config.siteTitle,
      description: config.siteDescription,
      type: 'website',
      locale: config.siteMetadata.language.replace('-', '_'),
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 字体预加载 */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=block" 
          as="style" 
        />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&display=block" 
          as="style" 
        />
        
        <style>{`
html {
  font-family: ${figtree.style.fontFamily}, system-ui, Arial, sans-serif;
  --font-sans: ${figtree.variable};
  --font-mono: ${GeistMono.variable};
  --font-instrument-serif: ${instrumentSerif.variable};
}

/* 字体加载时的fallback样式 */
.font-loading {
  font-family: system-ui, Arial, sans-serif;
}

.font-loading .instrument {
  font-family: Georgia, Times, serif;
}
        `}</style>
      </head>
      <body className={`${figtree.variable} ${instrumentSerif.variable} antialiased`}>
        {/* 跳转到主要内容，用于无障碍访问 */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          跳到主要内容
        </a>
        
        <div className="min-h-screen flex flex-col">
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
