import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const image = await getImage(parseInt((await params).id));

  return (
    <div>
      <img src={image.url} alt={image.name} className="w-96" />
      <p>{image.name}</p>
    </div>
  );
}
