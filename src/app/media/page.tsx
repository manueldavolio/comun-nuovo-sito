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
import { fetchSiteGallerySections, fetchSiteVideos } from "@/lib/cms";

export const metadata = {
  title: "Media",
  description:
    "Gallery foto, video YouTube e highlights: vivi il mondo biancoazzurro dentro e fuori dal campo.",
};

/** Ricontrolla il database CMS ogni 5 minuti */
export const revalidate = 300;

export default async function MediaPage() {
  // Album e video dal CMS (gestionale); se vuoti restano i contenuti statici.
  const [cmsSections, cmsVideos] = await Promise.all([
    fetchSiteGallerySections(),
    fetchSiteVideos(),
  ]);

  const gallerySections = cmsSections.length > 0 ? cmsSections : mediaGallerySections;
  const videos = cmsVideos.length > 0 ? cmsVideos : youtubeVideos;

  return (
    <div>
      <MediaHero />

      <div className="bg-[var(--club-page)]">
        <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6 sm:py-16 lg:space-y-24 lg:px-8 lg:py-20">
          <MediaPhotoGallery sections={gallerySections} />
          <MediaVideoSection videos={videos} />
          <MediaHighlights items={mediaHighlights} />
          <MediaSocialWall />
        </div>
      </div>
    </div>
  );
}
