import { compact, reduce } from "lodash"
import React from "react"

const Text = ({ text }) => {
  const components = compact([
    text.link && { C: "a", props: { href: text.link } },
    text.bold && { C: "strong" },
    text.italic && { C: "i" },
  ])

  return (
    <>
      {reduce(
        components,
        (all, { C, props = {} }) => (
          <C {...props}>{all}</C>
        ),
        text.plain_text
      )}
    </>
  )
}

export default Text
