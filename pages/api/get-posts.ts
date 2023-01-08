import { compact, map, pick, get } from "lodash";

import notion from "../../shared/notionClient";
import { DATABASE_IDS } from "../../shared/api.constants";

// Convert the api posts to something more understandable
export const transFormApiPost = (post) => {
  return {
    ...pick(post, ["id", "created_time", "last_edited_time"]),
    title: get(post, `properties.Name.title.0.plain_text`),
  };
};

const transFormApiPosts = (apiPosts) =>
  compact(map(apiPosts, transFormApiPost));

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.BLOGS,
      filter: {
        property: "Status",
        select: {
          equals: "published",
        },
      },
    });

    return res.status(200).json(transFormApiPosts(response.results));
  } catch (error) {
    return res.status(500).json({ error });
  }
}
