export const SITE_CONFIG = {
  name: "RIITHIS | Software Engineering Consultancy",
  shortName: "RIITHIS",
  description:
    "Custom software, web, mobile, and desktop application development, business automation, and high-performance API integration by Nickson Muriithi.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://riithis.com",
  ogImage: "https://riithis.com/og-default.png",
  author: {
    name: "Nickson Muriithi",
    role: "Software Engineer",
    brand: "RIITHIS",
  },
  social: {
    github: "https://github.com/riithis",
    linkedin: "https://linkedin.com/in/riithis",
  },
};

export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  canonicalUrl,
  noIndex = false,
  type = "website",
}: {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}) {
  const metaTitle = title ? `${title} | ${SITE_CONFIG.shortName}` : SITE_CONFIG.name;

  return {
    title: metaTitle,
    description,
    authors: [{ name: SITE_CONFIG.author.name }],
    creator: SITE_CONFIG.author.name,
    metadataBase: new URL(SITE_CONFIG.url),
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    openGraph: {
      title: metaTitle,
      description,
      url: canonicalUrl || SITE_CONFIG.url,
      siteName: SITE_CONFIG.shortName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [image],
      creator: "@riithis",
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
