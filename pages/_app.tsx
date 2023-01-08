import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

import "../dist/output.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Zachary Kirby</title>
        <meta
          name="description"
          content="The personal website of Zachary Kirby"
        />
        <link rel="icon" href="../public/favicon/favicon.ico" />
        <link rel="shortcut icon" href="../public/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="../public/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../public/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../public/favicon/favicon-16x16.png"
        />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
