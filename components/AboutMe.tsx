import { useSetAtom } from "jotai";
import { RoughNotation } from "react-rough-notation";
import React, { PropsWithChildren } from "react";

import { laserEyesEnabledAtom } from "../state/sound.atoms";

function Highlight({
  href,
  children,
}: PropsWithChildren<{
  href: string;
}>) {
  const enabledLaserEyes = useSetAtom(laserEyesEnabledAtom);

  return (
    <RoughNotation type="highlight" color="rgb(255, 241, 118)" show>
      <a
        href={href}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => enabledLaserEyes(true)}
        onMouseLeave={() => enabledLaserEyes(false)}
      >
        {children}
      </a>
    </RoughNotation>
  );
}

export default function AboutMe() {
  return (
    <div className="p-10 fixed w-full top-[140px] z-10">
      <div className="m-auto w-[800px] flex justify-center">
        {/* NOTE: I really like this picture but I'm not sure it really works with the current typewriter style */}
        {/* <div className="mr-6 relative bottom-2">
          <Image height="400" width="400" src={self} />
        </div> */}
        <div>
          <div className="text-left font-sans">
            <p className="mt-4 text-xl">Hi there.</p>
            <p className="mt-4 text-xl">
              Thanks for stopping by. You won't find much here except a few
              details about what I'm up to and maybe some relevant links. Let's
              start with the links:{" "}
              <Highlight href="https://substack.com/@zkirby">
                writings
              </Highlight>{" "}
              and{" "}
              <Highlight href="https://github.com/zkirby">github.</Highlight>
            </p>
            <p className="mt-4 text-xl">
              As far as what I'm up to, recently I was the co-founder of{" "}
              <Highlight href="https://www.vessel.dev/">Vessel</Highlight>. We
              were a YC/venture backed startup with the tag line "We make it
              quick and easy to add user-facing integrations to your SaaS
              product". It was the most interesting thing I've done in my career
              so far and was full of ups and downs and some lefts and one
              right... but that's a story for another time.
            </p>
            <p className="mt-4 text-xl">
              Right now I'm keeping myself busy exploring how digital interfaces
              will be reshaped by AI.
            </p>
            <p className="mt-4 text-xl">
              I have a general distaste for social media of any kind. I do,
              however, love to connect and exchange ideas with other people and
              will respond to most (relevant) emails. You can{" "}
              <Highlight href="mailto:zach@zkirby.com">contact</Highlight> me
              about anything, assuming it isn't an unnecessary solicitation.
            </p>
            <p className="text-xl mt-4 text-red-700">- Zachary Kirby</p>
          </div>
        </div>
      </div>
    </div>
  );
}
