import api from "../../shared/api";

// basic API cache to avoid needing any
// state management libraries
const _cache = {};
async function withCache(cb, key) {
  if (!(key in _cache)) {
    _cache[key] = await cb();
  }

  return _cache[key];
}

interface Post {
  id: string;
  title: string;
  created_time: string;
  last_edited_time: string;
}

export function getAllPostSummaries(): Promise<Post[]> {
  return withCache(api.get("/api/get-posts").json, "allPostSummaries");
}

export function getPost(postId) {
  return withCache(
    api.get("/api/get-post", { searchParams: { postId } }).json,
    postId
  );
}
