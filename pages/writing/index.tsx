import { RoughNotation } from "react-rough-notation";

/**
 * The blogs are added manually using next's built in mdx support so that they
 * can be easily copy and pasted from notion.
 *
 * Eventually I will build something more sophisticated if I feel there's a need.
 */
function Writing() {
  return (
    <div className="pt-[60px] text-xl font-sans ml-40">
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
          <li>
            <a href={`/writing/ai-parental-controls`}>
              AI Parental Controls: Using LLMs for Context-Dependent
              Self-Moderation with Transformer.js
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Writing;
