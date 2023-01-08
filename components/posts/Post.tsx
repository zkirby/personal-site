import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";

import Renderer from "./markdown/Renderer";
import SkeletonLoading from "../../shared/SkeletonLoading";
import useAsyncLoadState from "../../shared/useAsyncLoadState";
import { getPost } from "./posts.api";
import SkeletonPost from "./skeletons/SkeletonPost";

const Post = ({ postId }) => {
  const [post, status] = useAsyncLoadState(() => getPost(postId));

  return (
    <SkeletonLoading status={status} skeleton={<SkeletonPost />}>
      <div>
        <Link href="/">
          <FaHome />
        </Link>
        <div>
          <h1>{post?.title}</h1>
          <Renderer blocks={post?.content} />
        </div>
      </div>
    </SkeletonLoading>
  );
};

export default Post;
