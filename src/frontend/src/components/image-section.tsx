/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

// Глобальный кеш для сломанных изображений
const brokenImagesCache = new Set<string>();

export const ImageSectionSkeleton = () => {
  return (
    <>
      <div className="my-4 grid grid-cols-1 gap-2 lg:grid-cols-2 w-full">
        {[...Array(4)].map((_, index) => (
          <div className="w-full h-full" key={`image-skeleton-${index}`}>
            <Skeleton className="rounded-md object-cover shadow-none border-none w-full bg-card h-[160px] " />
          </div>
        ))}
      </div>
    </>
  );
};

export function ImageSection({ images }: { images: string[] }) {
  const [, forceUpdate] = useState({});

  const handleImageError = (imageUrl: string) => {
    brokenImagesCache.add(imageUrl);
    forceUpdate({}); // Принудительно обновляем компонент
  };

  const handleImageLoad = (imageUrl: string) => {
    // Убираем изображение из кеша сломанных, если оно загрузилось
    if (brokenImagesCache.has(imageUrl)) {
      brokenImagesCache.delete(imageUrl);
      forceUpdate({});
    }
  };

  if (images && images.length > 0) {
    // Фильтруем сломанные изображения
    const workingImages = images.filter(image => !brokenImagesCache.has(image));
    
    if (workingImages.length === 0) {
      return null; // Если все изображения сломаны, не показываем секцию
    }
    
    return (
      <div className="my-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
        {workingImages.map((image) => (
          <a
            key={image}
            href={image}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-video w-full h-full overflow-hidden hover:scale-[1.03] duration-150 rounded-lg transition-all shadow-md"
          >
            <img
              src={image}
              alt="Search result image"
              className="w-full object-cover object-top h-full max-h-[80vh]"
              onError={() => handleImageError(image)}
              onLoad={() => handleImageLoad(image)}
            />
          </a>
        ))}
      </div>
    );
  }
  return null;
}
