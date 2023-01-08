import React from "react";
import { useRouter } from "next/router";

import Post from "../../components/posts/Post";

const PostPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  return postId ? <Post postId={postId}></Post> : <></>;
};

export default PostPage;
