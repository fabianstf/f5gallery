import FullPageImageView from "~/components/full-image-page";
import { Modal } from "./modal";
import { getImage } from "~/server/queries";

export default function PhotoModal({
  params,
}: {
  params: { id: string };
}) {

  return (
    <Modal>
      <FullPageImageView id={parseInt(params.id)} />
    </Modal>
  );
}
