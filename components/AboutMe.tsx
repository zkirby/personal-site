import { useSetAtom } from "jotai";
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
    <a
      className="highlight"
      target="_blank"
      href={href}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => enabledLaserEyes(true)}
      onMouseLeave={() => enabledLaserEyes(false)}
    >
      {children}
    </a>
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
              Thanks for stopping by and checking out my website. You won't find
              much here except a collection of links and an enumaration of
              things I'm currently interested in which will begin now: HCI and
              the future of computer interfaces in an AI-first world, client
              performance - both build and runtime, and{" "}
              <Highlight href="https://substack.com/@zkirby">
                {" "}
                writing
              </Highlight>
              .
            </p>
            <p className="mt-4 text-xl">
              Recently, I was the co-founder of{" "}
              <Highlight href="https://www.vessel.dev/">Vessel</Highlight>, a
              YC/venture backed startup with the tag line "We make it quick and
              easy to add user-facing integrations to your SaaS product". It was
              the most interesting thing I've done in my (short) career so far.
              It was full of ups and downs and some lefts and one right... but
              that's a story for another time.
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
