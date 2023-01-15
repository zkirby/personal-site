import Link from "next/link";
import React, { useState } from "react";
import { format } from "date-fns";
import classnames from "classnames";

import SkeletonLoading from "../../shared/SkeletonLoading";
import SkeletonAllPosts from "./skeletons/SkeletonAllPosts";
import useAsyncLoadState from "../../shared/useAsyncLoadState";
import { getAllPostSummaries } from "./posts.api";

const bgColors = {
  green: "bg-green-300",
  blue: "bg-blue-300",
  yellow: "bg-yellow-300",
  red: "bg-red-300",
  purple: "bg-purple-300",
  pink: "bg-pink-300",
  gray: "bg-gray-300",
};

const PostSummary = ({ post }) => {
  const [expand, setExpand] = useState(false);

  return (
    <Link key={post.id} href={`/post/${post.id}`}>
      <div className="mt-2 cursor-pointer">
        <div className="flex">
          <strong className="mr-3">{post.title}</strong>
          <div>{format(new Date(post.created_time), "MM/dd/yyyy")}</div>
        </div>
        <div className="flex">
          {post.tags.map((s) => (
            <div
              className={classnames(
                "mr-3 mt-1 text-sm py-1 px-2 opacity-40 rounded-md",
                bgColors[s.color]
              )}
            >
              {s.name}
            </div>
          ))}
        </div>
        <p
          className={classnames("mt-2 text-sm w-96", {
            truncate: !expand,
          })}
          onClick={() => setExpand(!expand)}
        >
          {post.summary}
        </p>
      </div>
    </Link>
  );
};

const Writings = () => {
  const [summaries, status] = useAsyncLoadState(getAllPostSummaries, []);

  return (
    <div className="mt-10">
      <h3>Posts</h3>
      <SkeletonLoading status={status} skeleton={<SkeletonAllPosts />}>
        {summaries.map((post) => (
          <PostSummary post={post} />
        ))}
      </SkeletonLoading>
    </div>
  );
};

export default Writings;
