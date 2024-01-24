import React from "react";

export default function CompressedImage({ imageUrl }: any) {
  const compressedImageUrl = `/api/compress-images?url=${encodeURIComponent(
    imageUrl
  )}`;
  return <img src={compressedImageUrl} alt="Compressed Image" />;
}
