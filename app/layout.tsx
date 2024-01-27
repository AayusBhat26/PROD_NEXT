import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark, neobrutalism } from '@clerk/themes'
import { ThemeProvider } from '@/components/providers/themes-providers'
import { cn } from '@/lib/utils'

const inter = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PROD',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "bg-white dark:bg-[#000000] dark:text-blue-400")}>
        {/* <body className={inter.className}> */}
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false} storageKey='theme_prod'>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
