import React from "react";

function WritingLink() {
  return (
    <div className="mt-6">
      <h3 className="text-xl">Some text here</h3>
      <p className="mt-1">
        This is a brief desciption of this text as well as a reading estimate or
        something like that
      </p>
    </div>
  );
}

export default function Writings() {
  return (
    <div>
      <h1 className="text-4xl mb-6">Posts</h1>
      <WritingLink />
      <WritingLink />
      <WritingLink />
      <WritingLink />
    </div>
  );
}
