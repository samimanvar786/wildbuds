"use client";
import Image from "next/image";

interface ProductImage {
  id: number;
  image: string;
  is_featured?: boolean;
}

interface Props {
  images?: ProductImage[] | null; // array of objects
  selectedImage: number;
  onSelect: (index: number) => void;
}

export default function ProductImageGallery({
  images,
  selectedImage,
  onSelect,
}: Props) {
  // Ensure images is always an array of ProductImage
  const safeImages: ProductImage[] = Array.isArray(images) ? images : [];
  console.log("safeImages", selectedImage);

  if (safeImages.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500">
        No product images available
      </div>
    );
  }

  return (
    <div>
      {/* Main large image */}
      <Image
        src={images[0]?.image || "/placeholder.png"}
        alt={`Product image ${selectedImage + 1}`}
        width={600}
        height={600}
        className="rounded-lg object-cover w-full"
      />

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {safeImages.map((imgObj, i) => (
          <button
            key={imgObj.id ?? i}
            onClick={() => onSelect(i)}
            className={`aspect-square overflow-hidden border-2 rounded-lg ${
              selectedImage === i ? "border-[#03312f]" : "border-gray-200"
            }`}
          >
            <Image
              src={imgObj.image || "/placeholder-thumb.png"}
              alt={`Thumbnail ${i + 1}`}
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
