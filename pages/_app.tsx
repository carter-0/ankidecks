import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={inter.className}>
            <ClerkProvider {...pageProps}>
                <Component {...pageProps} />
            </ClerkProvider>
        </div>
    )
}
