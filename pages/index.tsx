import React from "react";
import Description from "../components/Description";

const PillButton = ({ text, onClick }) => {
  return (
    <button
      className="inline-block px-6 py-2 text-lg text-white font-bol bg-pastel-green border-2 rounded-full transition duration-200 ease-out transform hover:bg-black hover:text-white hover:scale-105"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default function Home({}) {
  return (
    <div className="w-100 p-10">
      <div className="flex m-auto w-4/5">
        <div className="basis-1/2">
          <Description />
        </div>
        <div className="ml-40 basis-1/2">
          <div>hello</div>
          <iframe
            src="https://zkirby.substack.com/embed"
            width="480"
            style={{ background: "black" }}
            height="320"
          ></iframe>
          <div className="text-xl mt-6">
            <a href="https://www.linkedin.com/in/zkirby/">LinkedIn</a>
            <a href="https://github.com/zkirby">Github</a>
            <a href="https://twitter.com/zkirby2020">Twitter</a>
            <a href="mailto:zach@zkirby.com">Email</a>
            <PillButton text="hello"></PillButton>
          </div>
        </div>
      </div>
    </div>
  );
}
