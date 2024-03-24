import { RoughNotation } from "react-rough-notation";

const ARTICLES = [
  {
    title: "Intra-language Translators",
    date: "03/24/24",
    path: "/writing/intra-language-translators",
  },
  {
    title: "Atomic Prompts",
    date: "03/22/24",
    path: "/writing/atomic-prompts",
  },
  {
    title:
      "AI Parental Controls: Using LLMs for Context-Dependent Self-Moderation with Transformer.js",
    date: "03/18/24",
    path: "/writing/ai-parental-controls",
  },
];

/**
 * The blogs are added manually using next's built in mdx support so that they
 * can be easily copy and pasted from notion.
 *
 * Eventually I will build something more sophisticated if I feel there's a need.
 */
function Writing() {
  return (
    <div className="pt-[60px] text-xl font-sans mx-40">
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
        <ul className="list-disc relative left-5 top-5">
          {ARTICLES.map((article) => (
            <li key={article.title} className="mb-5">
              <a href={article.path}>
                <span className="text-red-700">({article.date})</span>{" "}
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Writing;
