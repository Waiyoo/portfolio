import { SITE_CONFIG } from "./metadata.config";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.author.name,
    jobTitle: SITE_CONFIG.author.role,
    worksFor: {
      "@type": "Organization",
      name: SITE_CONFIG.author.brand,
    },
    url: SITE_CONFIG.url,
    sameAs: [SITE_CONFIG.social.github, SITE_CONFIG.social.linkedin],
  };
}

export function generateSoftwareApplicationSchema(project: {
  title: string;
  overview: string;
  category: string;
  slug: string;
  images?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.overview,
    applicationCategory: project.category,
    operatingSystem: "Web, Cross-platform",
    url: `${SITE_CONFIG.url}/projects/${project.slug}`,
    image: project.images?.[0] || SITE_CONFIG.ogImage,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
    },
  };
}

export function generateServiceSchema(services: Array<{ title: string; description: string; slug: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Engineering & Custom Application Development",
    provider: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Services",
      itemListElement: services.map((s, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
        position: idx + 1,
      })),
    },
  };
}