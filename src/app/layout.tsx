import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { clubLogoPath, clubName } from "@/data/site";
import { buildSiteIcons } from "@/lib/site-icons";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://comunnuovocalcio.it"),
  title: {
    default: clubName,
    template: `%s | ${clubName}`,
  },
  description:
    "Sito ufficiale dell’ASD Comun Nuovo: squadre, settore giovanile, news, media e contatti.",
  icons: buildSiteIcons(),
  openGraph: {
    title: clubName,
    description: "Passione, territorio e futuro sul campo e nella comunità.",
    locale: "it_IT",
    type: "website",
    images: [{ url: clubLogoPath, alt: clubName }],
  },
  twitter: {
    card: "summary",
    images: [clubLogoPath],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${bebas.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f3f7fb] text-[#001b3d]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
