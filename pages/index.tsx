import Writings from "components/posts/Writings";
import Head from "next/head";
import React from "react";
import Description from "../components/Description";

export default function Home({}) {
  return (
    <div className="w-100 p-10">
      <Head>
        <title>Zachary Kirby</title>
        <meta
          name="description"
          content="The personal website of Zachary Kirby"
        />
        <link rel="icon" href="../public/favicon/favicon.ico" />
      </Head>

      <div className="flex m-auto w-3/4">
        <div className="mr-40 basis-1/2">
          <Description />
        </div>
        <div className="ml-40 basis-1/2">
          <Writings />
        </div>
      </div>
    </div>
  );
}
