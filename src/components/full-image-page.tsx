import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "./ui/button";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const client = await clerkClient();
  const uploaderInfo = await client.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center pl-4">
        <img
          src={image.url}
          alt={image.name}
          className="flex-shrink object-contain"
        />
      </div>
      <div className="flex w-96 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>
        <div className="flex flex-col p-2">
          <span>Uploaded by:</span>
          <span>{uploaderInfo.fullName}</span>
          <span>{uploaderInfo.emailAddresses[0]?.emailAddress}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Created at:</span>
          <span>{new Date(image.createdAt).toLocaleString()}</span>
        </div>
        <div className="flex flex-col p-2">
          <form action={async () => {
            "use server";
            await deleteImage(image.id);
          }}>
            <Button type="submit" variant="destructive">Delete</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
