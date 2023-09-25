import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CodeExchange',
  description: 'Platform to share code snippets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
