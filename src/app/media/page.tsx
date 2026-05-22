import { MediaHero } from "@/components/media/MediaHero";
import { MediaHighlights } from "@/components/media/MediaHighlights";
import { MediaPhotoGallery } from "@/components/media/MediaPhotoGallery";
import { MediaSocialWall } from "@/components/media/MediaSocialWall";
import { MediaVideoSection } from "@/components/media/MediaVideoSection";
import {
  mediaGallerySections,
  mediaHighlights,
  youtubeVideos,
} from "@/data/media";

export const metadata = {
  title: "Media",
  description:
    "Gallery foto, video YouTube e highlights: vivi il mondo biancoazzurro dentro e fuori dal campo.",
};

export default function MediaPage() {
  return (
    <div>
      <MediaHero />

      <div className="bg-[var(--club-page)]">
        <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6 sm:py-16 lg:space-y-24 lg:px-8 lg:py-20">
          <MediaPhotoGallery sections={mediaGallerySections} />
          <MediaVideoSection videos={youtubeVideos} />
          <MediaHighlights items={mediaHighlights} />
          <MediaSocialWall />
        </div>
      </div>
    </div>
  );
}
