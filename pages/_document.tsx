import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta key={"description"} name={"description"} content={"Say goodbye to spending hours creating flashcards. With Anki Decks AI, you can create decks from your notes in seconds."} />
      </Head>
      <body className={"bg-gray-50"}>
        <Main />
        <NextScript />

        <Script id="analytics" strategy="lazyOnload">
            {`var _paq=window._paq=window._paq||[];_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);(function(){var u="https://analytics.carter.red/";_paq.push(['setTrackerUrl',u+'js/']);_paq.push(['setRequestMethod','POST']);_paq.push(['setSiteId','2']);var d=document,g=d.createElement('script'),s=d.getElementsByTagName('script')[0];g.async=true;g.src=u+'js/';s.parentNode.insertBefore(g,s)})();`}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FQZP7CTJBP"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
            {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', 'G-FQZP7CTJBP');
                `}
        </Script>

        <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "iw6gaclqp5");
                `}
        </Script>
      </body>
    </Html>
  )
}
