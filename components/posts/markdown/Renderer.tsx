import { map } from "lodash"
import React from "react"

import Text from "./components/Text"

const TYPE_TO_COMPONENT = {
  heading_3: "h3",
  heading_2: "h2",
  heading_1: "h1",
  paragraph: "p",
  numbered_list_item: "li",
  bulleted_list_item: "li",
}

const Renderer = ({ blocks }) => (
  <>
    {map(blocks, block => {
      const Component = TYPE_TO_COMPONENT[block.type]

      return (
        <Component key={block.id}>
          {map(block.text, text => (
            <Text key={`${block.id}-${text.plain_text}`} text={text} />
          ))}
        </Component>
      )
    })}
  </>
)

export default Renderer
