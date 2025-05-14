import Link from "next/link";

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

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImanges, ...mockImanges, ...mockImanges].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
