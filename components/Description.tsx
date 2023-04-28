import React from "react";
import Image from "next/image";

import self from "../public/self.jpg";
import RotatingText from "./RotatingText";

export default function Description() {
  return (
    <div className="text-left">
      <Image height="230" width="230" src={self} />
      <h1 className="text-4xl">Zachary Kirby</h1>
      <div className="text-left">
        <p className="mt-6 text-xl">
          Hi there, my name is Zach. I'm a full stack dev by trade and a hacker
          at heart currently living in San Francisco.
        </p>
        <p className="mt-4 text-xl">
          I'm the co-founder of <a href="https://www.vessel.dev/">Vessel,</a> a
          venture backed startup focused on making it quick and easy to add
          user-facing sales integrations to SaaS products.
        </p>
        <p className="mt-4 text-xl">
          I love meeting and connecting with new people. Don't hesitate to reach
          out or shoot me a LinkedIn request!
        </p>
      </div>
    </div>
  );
}

// * graduated from Berkeley with a CS degree and a 2/3 finished film degree
