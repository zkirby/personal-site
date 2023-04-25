import React from "react";
import Image from "next/image";

import self from "../public/self.jpg";
import RotatingText from "./RotatingText";

export default function Description() {
  return (
    <div>
      <Image height="300" width="300" src={self} />
      <h1 className="text-4xl">Zachary Kirby</h1>
      <p className="mt-6 text-xl">
        <RotatingText
          textList={["Hello", "你好", "Hola", "שלום", "Bonjour", "مرحباً"]}
        />
        , my name is Zach. I'm a full stack dev by trade and a hacker at heart
        currently living in San Francisco.
      </p>
      <p className="mt-4 text-xl">
        I'm currently building <a href="https://www.vessel.land/">Vessel.</a>{" "}
        We're an engineering led company on a quest to make deep and feature
        rich integrations with 3rd party systems a breeze.
      </p>
      <p className="mt-4 text-xl">
        I love meeting new people, I think it's what makes the internet truly
        special. Don't hesitate to reach out about anything - I almost always
        reply!
      </p>
    </div>
  );
}

// * graduated from Berkeley with a CS degree and a 2/3 finished film degree
