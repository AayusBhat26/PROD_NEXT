import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/themes-providers'
import { cn } from '@/lib/utils'
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';

const inter = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WORKIFY',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [ neobrutalism],
        variables: { colorPrimary: '#6809C6' },
        signIn: {
          baseTheme: [dark],
          variables: { colorPrimary: '#6809C6' }
        },
        signUp: {
          baseTheme: [dark],
          variables: { colorPrimary: '#6809C6' }
        }
      }}

    >
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "text-red-200 bg-[#0c0d0d]")}>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false} storageKey='theme_prod'>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
