import Writings from "components/posts/Writings";
import React from "react";
import Description from "../components/Description";

export default function Home({}) {
  return (
    <div className="w-100 p-10">
      <div className="flex m-auto w-1/2">
        {/* <div className="basis-1/2"> */}
        <Description />
        {/* </div>
        <div className="ml-40 basis-1/2">
          <Writings />
        </div> */}
      </div>
    </div>
  );
}
