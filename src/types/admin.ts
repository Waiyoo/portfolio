export type PublicationStatus = "DRAFT" | "PUBLISHED";

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  category: "Mobile Social-Commerce" | "Trading & Quantitative Systems" | "Business Management Systems";
  tagline: string;
  status: PublicationStatus;
  operationalStatus: "COMPLETED_PROTOTYPE" | "PARTIALLY_COMPLETED" | "IN_DEVELOPMENT";
  overview: string;
  objective: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[]; // Linked Tech IDs
  images: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  caseStudyRef?: string;
  updatedAt: string;
}

export interface ServiceRecord {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  status: PublicationStatus;
  order: number;
}

export interface TechnologyRecord {
  id: string;
  name: string;
  category: "frontend" | "backend" | "integrations" | "data_systems";
  iconName?: string;
  projectCount: number;
}

export interface SystemAuditLog {
  id: string;
  action: string;
  entity: string;
  timestamp: string;
}