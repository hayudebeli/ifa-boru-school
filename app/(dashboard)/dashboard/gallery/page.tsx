import { getAllGallery } from "@/actions/gallery";
import GalleryManager from "@/components/dashboard/GalleryManager";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const gallery = await getAllGallery();
  return <GalleryManager initialData={gallery} />;
}
