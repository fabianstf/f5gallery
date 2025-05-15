import { db } from "~/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

async function Images() {

  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => [desc(model.id)],
  });

  return (
    <div className="flex flex-wrap gap-4">
    {images.map((image, index) => (
      <div key={image.id + "-" + index} className="flex w-48 flex-col">
        <img src={image.url} />
        <div className="text-sm">{image.name}</div>
      </div>
    ))}
  </div>
  )
}

export default async function HomePage() {


  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl text-center">Please Sign in to add Images</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>

    </main>
  );
}
