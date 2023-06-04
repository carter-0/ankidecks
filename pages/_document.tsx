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
      </Head>
      <body className={"bg-gray-50"}>
        <Main />
        <NextScript />

        <Script id="analytics" strategy="lazyOnload">
            {`
                  var _paq = window._paq = window._paq || [];
                  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
                  _paq.push(['trackPageView']);
                  _paq.push(['enableLinkTracking']);
                  (function() {
                    var u="https://analytics.carter.red/";
                    _paq.push(['setTrackerUrl', u+'matomo.php']);
                    _paq.push(['setSiteId', '2']);
                    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
                `}
        </Script>
      </body>
    </Html>
  )
}
