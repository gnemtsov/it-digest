import dotenv from "dotenv";
dotenv.config();

export default async function getRedditToken() {
  const credentials = `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`;
  const encodedAuth = Buffer.from(credentials).toString("base64");

  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${encodedAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "ITDigest/1.0 by u/gnemtsov"
    },
    body: new URLSearchParams({
      grant_type: "password",
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("❌ Failed to fetch token", res.status, data);
    throw new Error("Could not obtain Reddit token");
  }

  return data.access_token;
}
