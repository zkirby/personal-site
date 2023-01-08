import { get, map, pick } from "lodash";
import notion from "../../shared/notionClient";

import { transFormApiPost } from "./get-posts";

function transformApiPostContent(content) {
  return map(content, (block) => {
    const allText = get(block, [block.type, "text"], []);
    return {
      ...pick(block, ["id", "type"]),
      text: map(allText, (text) => ({
        ...pick(text, ["plain_text"]),
        ...text.annotations,
        link: text.href,
      })),
    };
  });
}

export default async function handler(req, res) {
  try {
    let [post, content] = await Promise.all([
      notion.pages.retrieve({ page_id: req.query.postId }),
      notion.blocks.children.list({ block_id: req.query.postId }),
    ]);

    return res.status(200).json({
      body: {
        ...transFormApiPost(post),
        content: transformApiPostContent(get(content, "results")),
      },
    });
  } catch (_) {
    return res.status(500).json();
  }
}
