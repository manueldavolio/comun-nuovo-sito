import Image from "next/image";
import type { NewsGalleryImage } from "@/types/site";

type NewsGalleryProps = {
  images: NewsGalleryImage[];
  title?: string;
};

export function NewsGallery({ images, title = "Galleria" }: NewsGalleryProps) {
  if (!images.length) return null;

  return (
    <section className="mt-12 border-t border-slate-200/80 pt-12">
      <h2 className="font-display text-2xl uppercase tracking-wide text-slate-900 sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {images.map((img) => (
          <figure
            key={img.id}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width:640px) 50vw, 33vw"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#001b3d]/90 to-transparent p-3 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
              {img.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
