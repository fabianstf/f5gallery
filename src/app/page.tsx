import Link from "next/link";
import { db } from "~/server/db";

const mockUrls = [
  "https://ul90y0n95m.ufs.sh/f/PW9nY7lSaC4ent16Dkw8YGFNmRx6yU9LPZVIHS37BQEzT8wb",
  "https://ul90y0n95m.ufs.sh/f/PW9nY7lSaC4e2Zaz5hrivtTVoYJ4SaeLXbCzWKDwrHEl6dpM",
  "https://ul90y0n95m.ufs.sh/f/PW9nY7lSaC4exWeGdVUXbJ3KGH2FSi4qwgYr0khfyCmoPz7a",
  "https://ul90y0n95m.ufs.sh/f/PW9nY7lSaC4ek86h0lT8panhd7ZfWsevYlPRcgS1itGoHNJD",
];

const mockImanges = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {

  const posts = await db.query.posts.findMany();
  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImanges, ...mockImanges, ...mockImanges].map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
