import Link from "next/link";
import React from "react";

import SkeletonLoading from "../../shared/SkeletonLoading";
import SkeletonAllPosts from "./skeletons/SkeletonAllPosts";
import useAsyncLoadState from "../../shared/useAsyncLoadState";
import { getAllPostSummaries } from "./posts.api";

const Writings = () => {
  const [summaries, status] = useAsyncLoadState(getAllPostSummaries, []);

  return (
    <SkeletonLoading status={status} skeleton={<SkeletonAllPosts />}>
      {summaries.map((post) => (
        <Link key={post.id} className="clear-style" href={`/post/${post.id}`}>
          <h5>{post.title}</h5>
        </Link>
      ))}
    </SkeletonLoading>
  );
};

export default Writings;
