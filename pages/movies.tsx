import React from "react";
import Description from "../components/Description";
import useAsyncLoadState from "shared/useAsyncLoadState";

export default function Movies({}) {
  const [post, status] = useAsyncLoadState(() => getPost(postId));

  return (
    <div className="w-100 p-10">
      <div className="flex m-auto w-1/2"></div>
    </div>
  );
}
