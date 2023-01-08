import Link from "next/link";
import React, { useMemo } from "react";
import { FaHome } from "react-icons/fa";

import Renderer from "./markdown/Renderer";
import SkeletonLoading from "../../shared/SkeletonLoading";
import useAsyncLoadState from "../../shared/useAsyncLoadState";
import { getPost } from "./posts.api";
import SkeletonPost from "./skeletons/SkeletonPost";

const Post = ({ postId }) => {
  const [post, status] = useAsyncLoadState(() => getPost(postId));

  const body = useMemo(() => post?.body ?? {}, [post]);

  return (
    <SkeletonLoading status={status} skeleton={<SkeletonPost />}>
      <div>
        <Link href="/">
          <FaHome className="text-xl fixed top-5 left-8 cursor-pointer" />
        </Link>
        <div className="py-10 px-64">
          <h1 className="mb-5">{body.title}</h1>
          <div className="text-lg leading-6">
            <Renderer blocks={body.content} />
          </div>
        </div>
      </div>
    </SkeletonLoading>
  );
};

export default Post;
