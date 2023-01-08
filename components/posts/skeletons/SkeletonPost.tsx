import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonPost = () => {
  return (
    <ContentLoader
      viewBox="0 0 213 200"
      height={750}
      width={"100%"}
      backgroundColor="#f3f3f3"
      foregroundColor="#beced1"
    >
      <rect x="0%" y="5" width="30%" height="15" />
      <rect x="0" y="30" width="100%" height="10" />
      <rect x="0" y="45" width="100%" height="10" />
      <rect x="0" y="60" width="100%" height="10" />
      <rect x="0" y="75" width="65%" height="10" />
      <rect x="75%" y="75" width="10%" height="10" />
      <rect x="0" y="100" width="100%" height="10" />
      <rect x="0" y="115" width="100%" height="10" />
      <rect x="0" y="130" width="100%" height="10" />
      <rect x="0" y="145" width="50%" height="10" />
      <rect x="0" y="165" width="100%" height="10" />
      <rect x="0" y="180" width="100%" height="10" />
    </ContentLoader>
  )
}

export default SkeletonPost
