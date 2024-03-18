import { RoughNotation } from "react-rough-notation";

function Writing() {
  return (
    <div className="pt-[60px] text-xl font-sans flex justify-center">
      <div>
        {/* Wrapping div needed to get rough notations properly aligned */}
        <h1 className="w-fit">
          <RoughNotation
            type="underline"
            color="rgb(185 28 28)"
            strokeWidth={1.5}
            animationDuration={400}
            iterations={5}
            show
          >
            Writings
          </RoughNotation>
        </h1>
        <ul className="list-disc ml-5 mt-5">
          <li>A quick title for the post</li>
          <li>A quick title for the post</li>
          <li>A quick title for the post</li>
          <li>A quick title for the post</li>
        </ul>
      </div>
    </div>
  );
}

export default Writing;
