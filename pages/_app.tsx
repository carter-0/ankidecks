import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

function App({ Component, pageProps }: AppProps) {
    return (
        <div className={inter.className}>
            <ClerkProvider {...pageProps}>
                <Component {...pageProps} />
                <Toaster />
            </ClerkProvider>
        </div>
    )
}

export default App