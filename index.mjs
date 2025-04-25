import dotenv from "dotenv";
import getRedditToken from "./getRedditToken.mjs";

dotenv.config();

const SUBREDDIT = "javascript";

async function main() {
  const token = await getRedditToken();

  const res = await fetch(`https://oauth.reddit.com/r/${SUBREDDIT}/top?t=week&limit=5`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "User-Agent": "ITDigest/1.0 by u/gnemtsov"
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch Reddit posts:", res.status);
    process.exit(1);
  }

  const json = await res.json();
  const posts = json.data.children.map((c) => c.data);

  for (const post of posts) {
    console.log(`• ${post.title} (${post.ups} upvotes)`);
    console.log(`  https://reddit.com${post.permalink}\n`);
  }
}

main();
