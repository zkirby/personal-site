import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Source+Sans+3:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <title>Zachary Kirby</title>
        <meta
          name="description"
          content="The personal website of Zachary Kirby"
        />
        <link rel="icon" href="/image/favicon.ico" />
        <link rel="shortcut icon" href="/image/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/image/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/image/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/image/favicon-16x16.png"
        />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
