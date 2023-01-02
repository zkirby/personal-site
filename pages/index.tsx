import Head from "next/head";
import React from "react";
import Description from "../components/Description";

export default function Home({}) {
  return (
    <div>
      <Head>
        <title>Zachary Kirby</title>
        <meta
          name="description"
          content="The personal website of Zachary Kirby"
        />
        <link rel="icon" href="../public/favicon/favicon.ico" />
      </Head>

      <div className="m-0 w-1/2">
        <Description />
      </div>
    </div>
  );
}
