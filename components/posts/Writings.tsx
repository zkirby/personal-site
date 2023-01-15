import Link from "next/link";
import React from "react";
import { format } from "date-fns";

import SkeletonLoading from "../../shared/SkeletonLoading";
import SkeletonAllPosts from "./skeletons/SkeletonAllPosts";
import useAsyncLoadState from "../../shared/useAsyncLoadState";
import { getAllPostSummaries } from "./posts.api";

const Writings = () => {
  const [summaries, status] = useAsyncLoadState(getAllPostSummaries, []);

  return (
    <div className="mt-10">
      <h3>Posts</h3>
      <SkeletonLoading status={status} skeleton={<SkeletonAllPosts />}>
        {summaries.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <div className="mt-2">
              <strong className="cursor-pointer">{post.title}</strong>
              <div className="flex">
                {post.tags.map((s) => (
                  <div className={`mr-3 text-${s.color}-500`}>{s.name}</div>
                ))}
              </div>
              <div>{format(new Date(post.created_time), "MM/dd/yyyy")}</div>
              <p>{post.summary}</p>
            </div>
          </Link>
        ))}
      </SkeletonLoading>
    </div>
  );
};

export default Writings;
