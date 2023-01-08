import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonAllPosts = ({ count = 6 }) => (
  <div className="d-flex flex-column">
    {Array(count)
      .fill(null)
      .map((_, i) => (
        <ContentLoader
          className="mt-3"
          height={25}
          width={150}
          speed={2}
          backgroundColor="#f3f3f3"
          foregroundColor="#beced1"
          viewBox="0 0 150 25"
          key={i}
        >
          <rect x="0" y="0" width="150" height="25" />
        </ContentLoader>
      ))}
  </div>
);

export default SkeletonAllPosts;
