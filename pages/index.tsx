import React from "react";
import Description from "../components/Description";
import Modal from "../components/Modal";
import { MdEmail } from "react-icons/md";
import { BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";

const PillButton = ({
  children,
  onClick,
  href,
  className,
}: {
  children: any;
  onClick?: any;
  href?: string;
  className?: string;
}) => {
  return (
    <button
      className={`block px-6 py-2 text-xl font-bold border-2 transition duration-200 ease-out transform hover:scale-105 ${className}`}
      onClick={href ? () => open(href, "_blank") : onClick}
    >
      {children}
    </button>
  );
};

export default function Home({}) {
  return (
    <div className="p-10 overflow-hidden">
      <div className="flex m-auto w-4/5">
        <div className="basis-1/2">
          <Description />
        </div>
        <div className="ml-40 basis-1/2 flex items-center justify-center h-screen">
          <div className="flex flex-col items-center w-fit">
            <PillButton
              className="w-full rounded-md"
              href="https://zkirby.substack.com/"
            >
              writings
            </PillButton>
            {/* <PillButton className="mt-6 w-full rounded-md">about</PillButton> */}
            <div className="flex mt-6">
              <PillButton
                href="https://www.linkedin.com/in/zkirby/"
                className="rounded-full px-4 py-4 mr-6 bg-pastel-lavender text-white"
              >
                <BsLinkedin />
              </PillButton>
              <PillButton
                href="https://github.com/zkirby"
                className="rounded-full px-4 py-4 mr-6 bg-pastel-green text-white"
              >
                <BsGithub />
              </PillButton>
              <PillButton
                href="https://twitter.com/zkirby2020"
                className="rounded-full px-4 py-4 mr-6 bg-pastel-blue text-white"
              >
                <BsTwitter />
              </PillButton>
              <PillButton
                href="mailto:zach@zkirby.com"
                className="rounded-full px-4 py-4 bg-pastel-red text-white"
              >
                <MdEmail />
              </PillButton>
            </div>
            {/* <Modal /> */}
          </div>
          {/* Other things to put here eventually: cool links, movies list, maybe notes. */}
        </div>
      </div>
    </div>
  );
}
