import * as diff from "diff";

export default function Diff({ oldTxt, newTxt }) {
  const diffTxt = diff.diffWords(oldTxt, newTxt);

  return (
    <div className="writing-spacing writing-font flex">
      <div className="bg-gray-100 p-3 rounded">
        {diffTxt.map((w) => {
          if (w.added) return;

          return (
            <span className={w.removed ? "text-red-400" : ""}>{w.value} </span>
          );
        })}
      </div>
      <div className="w-[200px]"></div>
      <div className="bg-gray-100 p-3 rounded">
        {diffTxt.map((w) => {
          if (w.removed) return;

          return (
            <span className={w.added ? "text-green-400" : ""}>{w.value} </span>
          );
        })}
      </div>
    </div>
  );
}
