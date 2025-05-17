import FullPageImageView from "~/components/full-image-page";

export default function PhotoPage({
  params,
}: {
  params: { id: string };
}) {

  return (
      <FullPageImageView id={parseInt(params.id)} />
  );
}
