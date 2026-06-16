import { MediaHero } from "@/components/media/MediaHero";
import { MediaHighlights } from "@/components/media/MediaHighlights";
import { MediaPhotoGallery } from "@/components/media/MediaPhotoGallery";
import { MediaSocialWall } from "@/components/media/MediaSocialWall";
import { MediaVideoSection } from "@/components/media/MediaVideoSection";
import { ContentPlaceholder } from "@/components/ui/ContentPlaceholder";
import {
  mediaGallerySections,
  youtubeVideos,
} from "@/data/media";
import { fetchSiteGallerySections, fetchSiteNews, fetchSiteVideos } from "@/lib/cms";
import { fetchPageContentMap, getPageContentDefinition, mergePageContent } from "@/lib/page-content";
import type { MediaGallerySection, MediaHighlight, NewsItem, YoutubeVideo } from "@/types/site";

export const metadata = {
  title: "Media",
  description:
    "Gallery foto, video YouTube e highlights: vivi il mondo biancoazzurro dentro e fuori dal campo.",
};

/** Ricontrolla il database CMS ogni 5 minuti */
export const revalidate = 300;

function youtubeThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function isPlaceholderImage(src: string) {
  return src.includes("/placeholder-") || src.includes("/placeholder.");
}

function buildCmsHighlights({
  news,
  videos,
  sections,
}: {
  news: NewsItem[];
  videos: YoutubeVideo[];
  sections: MediaGallerySection[];
}): MediaHighlight[] {
  const newsHighlights = news.map((item) => ({
    id: `news-${item.slug}`,
    title: item.title,
    subtitle: item.excerpt,
    tag: item.category,
    image: isPlaceholderImage(item.image) ? undefined : item.image,
    date: item.date,
  }));

  const videoHighlights = videos.map((video) => ({
    id: `video-${video.id}`,
    title: video.title,
    subtitle: video.description ?? "Guarda il nuovo contenuto video ufficiale del club.",
    tag: "Video",
    image: youtubeThumb(video.youtubeId),
  }));

  const galleryHighlights = sections.map((section) => ({
    id: `gallery-${section.id}`,
    title: section.title,
    subtitle: `Nuova gallery ufficiale con ${section.images.length} foto disponibili.`,
    tag: "Gallery",
    image: section.images.find((image) => !isPlaceholderImage(image.src))?.src,
  }));

  return [...newsHighlights, ...videoHighlights, ...galleryHighlights].slice(0, 4);
}

export default async function MediaPage() {
  // Album, video e news arrivano dal CMS; gli array statici non contengono demo.
  const [cmsSections, cmsVideos, cmsNews, contentMap] = await Promise.all([
    fetchSiteGallerySections(),
    fetchSiteVideos(),
    fetchSiteNews(),
    fetchPageContentMap("media"),
  ]);

  const gallerySections = cmsSections.length > 0 ? cmsSections : mediaGallerySections;
  const videos = cmsVideos.length > 0 ? cmsVideos : youtubeVideos;
  const highlights = buildCmsHighlights({ news: cmsNews, videos: cmsVideos, sections: cmsSections });
  const definition = getPageContentDefinition("media", "main");
  const pageContent = definition ? mergePageContent(definition.fallback, contentMap.get("main")) : null;
  const hasMedia = gallerySections.length > 0 || videos.length > 0;

  return (
    <div>
      <MediaHero title={pageContent?.title ?? undefined} subtitle={pageContent?.subtitle ?? undefined} />

      <div className="bg-[var(--club-page)]">
        <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6 sm:py-16 lg:space-y-24 lg:px-8 lg:py-20">
          {hasMedia ? (
            <>
              <MediaPhotoGallery sections={gallerySections} />
              <MediaVideoSection videos={videos} />
            </>
          ) : (
            <ContentPlaceholder
              badge="COMING SOON"
              eyebrow="Media"
              title="Media in arrivo"
              message={pageContent?.content ?? "Foto e video ufficiali verranno pubblicati a breve."}
            />
          )}
          <MediaHighlights items={highlights} />
          <MediaSocialWall />
        </div>
      </div>
    </div>
  );
}
