import { useSetAtom } from "jotai";
import { RoughNotation } from "react-rough-notation";
import React, { PropsWithChildren } from "react";

import { laserEyesEnabledAtom } from "../state/sound.atoms";
import Link from "next/link";
import { cn } from "../lib/utils";

function Highlight({
  href,
  internalLink = false,
  children,
}: PropsWithChildren<{
  internalLink?: boolean;
  href: string;
}>) {
  const enabledLaserEyes = useSetAtom(laserEyesEnabledAtom);
  const Component = internalLink ? Link : "a";

  return (
    <RoughNotation type="highlight" color="rgb(255, 241, 118)" show>
      <Component
        href={href}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => enabledLaserEyes(true)}
        onMouseLeave={() => enabledLaserEyes(false)}
      >
        {children}
      </Component>
    </RoughNotation>
  );
}

function Paragraph({ color, children }: PropsWithChildren<{ color?: "red" }>) {
  return (
    <p
      className={cn("mt-4 text-xl", {
        "text-red-700": color === "red",
      })}
    >
      {children}
    </p>
  );
}

export default function AboutMe() {
  return (
    <div className="p-10 fixed w-full top-[140px] z-10 font-sans flex justify-center">
      <div className="w-[800px]">
        <Paragraph>Hi there.</Paragraph>
        <Paragraph>
          Thanks for stopping by. You won't find much here except a few details
          about what I'm up to and maybe some relevant links. Let's start with
          the links:{" "}
          {/* <Highlight href="/writing" internalLink>
            writings
          </Highlight>{" "} */}
          <Highlight href="https://www.linkedin.com/in/zkirby/">
            linkedIn
          </Highlight>{" "}
          and <Highlight href="https://github.com/zkirby">github.</Highlight>
        </Paragraph>
        <Paragraph>
          As far as what I'm up to, recently I was the co-founder of{" "}
          <Highlight href="https://www.vessel.dev/">Vessel</Highlight>. We were
          a YC/venture backed startup with the tag line "We make it quick and
          easy to add user-facing integrations to your SaaS product". It was the
          most interesting thing I've done in my career so far and was full of
          ups and downs and some lefts and one right... but that's a story for
          another time.
        </Paragraph>
        {/* <Paragraph>
          Right now, I'm keeping busy by{" "}
          <Highlight href="/writing/research" internalLink>
            exploring
          </Highlight>{" "}
          how AI can be used to augment human intelligence and enrich how we
          communicate with one another.
        </Paragraph> */}
        <Paragraph>
          I'm currently open to new engineering roles. In particular, I'm
          looking to work at a fast growing company working in the AI space.
        </Paragraph>
        <Paragraph>
          I have a general distaste for social media of any kind. I do, however,
          love to connect and exchange ideas with other people and will respond
          to most (relevant) emails. You can{" "}
          <Highlight href="mailto:zach@zkirby.com">contact</Highlight> me about
          anything, assuming it isn't an unnecessary solicitation.
        </Paragraph>
        <Paragraph color="red">- Zachary Kirby</Paragraph>
      </div>
    </div>
  );
}
