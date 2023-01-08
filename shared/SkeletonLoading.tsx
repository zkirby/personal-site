import React from "react"

// eventually this will be more complex, for now it's just
// returning either the skeleton or the children
const SkeletonLoading = ({ status, children, skeleton }) => {
  if (status.error) {
    return (
      <div className="error">
        Sorry looks like something went wrong :(, try refreshing - error:{" "}
        {status.error}
      </div>
    )
  }

  return status.loading || !status.isLoaded ? skeleton : children
}

export default SkeletonLoading
