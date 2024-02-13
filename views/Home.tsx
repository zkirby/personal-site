import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";


export default function Home({ }) {
  return (
    <div className="p-10 ">
      <div className="m-auto w-[800px] flex justify-center">
        {/* NOTE: I really like this picture but I'm not sure it really works with the current typewriter style */}
        {/* <div className="mr-6 relative bottom-2">
          <Image height="400" width="400" src={self} />
        </div> */}
        <div>
          {/* <div className="flex items-baseline">
            <a className="ml-3" href="mailto:zach@zkirby.com" target="_blank">
              <AiOutlineMail size={20} />
            </a>
            <a
              className="ml-1"
              href="https://substack.com/@zkirby"
              target="_blank"
            >
              <BiPencil size={20} />
            </a>
            <a
              className="ml-1"
              href="https://www.linkedin.com/in/zkirby"
              target="_blank"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div> */}
          <div className="text-left font-sans">
            <p className="mt-4 text-xl">
              Hi there, my name is Zach. I'm a Berkeley grad and former software
              engineer turned founder living in San Francisco.
            </p>
            <p className="mt-4 text-xl">
              Currently, I'm the co-founder of{" "}
              <a
                className="highlight "
                target="_blank"
                href="https://www.vessel.dev/"
              >
                Vessel
              </a>
              , a YC/venture backed startup focused on making it quick and easy
              to add user-facing integrations to SaaS products.
            </p>
            <p className="mt-4 text-xl">
              As most founders know, it's rare to have any substantial amount of
              free time in this line of work. But when I do have time, I usually
              spend it in nature or doing some form of reading,{" "}
              <a
                className="highlight"
                target="_blank"
                href="https://substack.com/@zkirby"
              >
                writing
              </a>
              , or partaking in my second passion: film.
            </p>
            <p className="mt-4 text-xl">
              I have a general distaste for social media of any kind (including
              Twitter/Instagram/Reddit/etc) and tend not to use it. I do,
              however, love to connect and exchange ideas with other people and
              will respond to most (relevant) emails and LinkedIn requests.
            </p>
            <p className="mt-4 text-xl">
              You can contact me about anything (assuming it isn't an
              unnecessary solicitation), but right now I most enjoy{" "}
              <a
                className="highlight"
                target="_blank"
                href="https://substack.com/notes"
              >
                discussing
              </a>
              : the role of human behavior in entrepreneurship, the evolution of
              communication caused by AI, and the role of technology in American
              culture issues such as the loneliness epidemic.
            </p>
            <p className="text-xl mt-4 text-red-700">- Zachary Kirby</p>
          </div>
        </div>
      </div>
    </div>
  );
}
