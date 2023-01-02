import React from "react";

export default function Description() {
  return (
    <div>
      <a href="http://cathleenmjia.com/">
        {/* Use img tag since bun polyfills the next Image component anyway */}
        <img height="100" width="100" src={"../public/self.jpg"} />
      </a>
      <h1>Zachary Kirby</h1>
      <p>
        Hello there, my name is Zach. I'm a full stack dev by trade and a hacker
        at heart currently living in San Francisco.
      </p>
      <p>
        I'm currently building <a href="https://www.vessel.land/">Vessel.</a>{" "}
        We're an engineering led company on a quest to make deep and feature
        rich integrations with 3rd party systems a breeze.
      </p>
      <p>
        In the few weekly hours I'm not working on Vessel, I find myself either
        writing, watching movies, or occasionally trying to learning a new
        language.
      </p>
      <p>
        I've always enjoyed meeting new people - don't be a stranger, feel free
        to reach out via some method below.
      </p>
      <a href="https://www.linkedin.com/in/zkirby/">LinkedIn</a>
      <a href="https://github.com/zkirby">Github</a>
      <a href="https://twitter.com/zkirby2020">Twitter</a>
    </div>
  );
}
