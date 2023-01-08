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

export function getAllPostSummaries() {
  return withCache(api.get("/api/get-posts").json, "allPostSummaries");
}

export function getPost(postId) {
  return withCache(
    api.get("/api/get-post", { searchParams: { postId } }).json,
    postId
  );
}
