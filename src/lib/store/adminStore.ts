import { ProjectRecord, ServiceRecord, TechnologyRecord, SystemAuditLog } from "@/types/admin";
import { ContactInquiry } from "@/types/contact";
import { inquiriesStore } from "@/lib/store/db";

// Global administrative datastores (Prisma / PostgreSQL ready)
const globalStore = globalThis as unknown as {
  projects: ProjectRecord[];
  services: ServiceRecord[];
  technologies: TechnologyRecord[];
  auditLogs: SystemAuditLog[];
};

export const projectsStore: ProjectRecord[] = globalStore.projects || [
  {
    id: "proj_1",
    slug: "riithis-clothing",
    title: "Riithis Clothing",
    category: "Mobile Social-Commerce",
    tagline: "Mobile Social-Commerce Marketplace for Fashion Retailers",
    status: "PUBLISHED",
    operationalStatus: "COMPLETED_PROTOTYPE",
    overview: "Riithis Clothing is a full-stack mobile social-commerce application...",
    objective: "To eliminate friction between social media browsing and mobile payments.",
    problem: "Kenyan fashion micro-merchants traditionally advertise on unstructured feeds...",
    solution: "Engineered a React Native mobile app paired with a Node.js REST API...",
    features: ["Social Feed", "Customer Ordering", "In-App Messaging", "Seller Dashboard"],
    technologies: ["React Native", "Node.js", "MongoDB", "M-Pesa API"],
    images: ["/assets/projects/riithis-feed.png"],
    links: { github: "https://github.com/RIITHIS/riithis-clothing" },
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj_2",
    slug: "quant-form",
    title: "Quant Form",
    category: "Trading & Quantitative Systems",
    tagline: "Automated Quantitative Market Analysis & Signal Engine",
    status: "PUBLISHED",
    operationalStatus: "COMPLETED_PROTOTYPE",
    overview: "Quant Form is a quantitative signal engine designed for market analysis...",
    objective: "To eliminate emotional bias in chart analysis using Python algorithms.",
    problem: "Manual price action analysis across multiple timeframes is time-intensive...",
    solution: "Engineered a Python core that ingests MT5 data and identifies order blocks...",
    features: ["Market Data Ingestion", "Order Block Engine", "JSON Signal Generation"],
    technologies: ["Python", "Pandas", "MetaTrader 5 API", "Lightweight Charts"],
    images: ["/assets/projects/quant-chart.png"],
    links: { github: "https://github.com/RIITHIS/quant-form" },
    updatedAt: new Date().toISOString(),
  }
];

export const servicesStore: ServiceRecord[] = globalStore.services || [
  {
    id: "srv_1",
    title: "Custom Software Engineering",
    slug: "custom-software",
    description: "Tailored full-stack business automation and web infrastructure.",
    features: ["Next.js Architecture", "PostgreSQL Schemas", "REST / GraphQL APIs"],
    status: "PUBLISHED",
    order: 1
  }
];

export const technologiesStore: TechnologyRecord[] = globalStore.technologies || [
  { id: "tech_1", name: "React Native", category: "frontend", projectCount: 1 },
  { id: "tech_2", name: "Next.js", category: "frontend", projectCount: 2 },
  { id: "tech_3", name: "Node.js", category: "backend", projectCount: 2 },
  { id: "tech_4", name: "Python", category: "backend", projectCount: 1 },
  { id: "tech_5", name: "M-Pesa API", category: "integrations", projectCount: 2 },
];

export const auditLogsStore: SystemAuditLog[] = globalStore.auditLogs || [
  { id: "log_1", action: "SYSTEM_INITIALIZATION", entity: "SYSTEM", timestamp: new Date().toISOString() }
];

if (process.env.NODE_ENV !== "production") {
  globalStore.projects = projectsStore;
  globalStore.services = servicesStore;
  globalStore.technologies = technologiesStore;
  globalStore.auditLogs = auditLogsStore;
}

export function logAuditAction(action: string, entity: string) {
  auditLogsStore.unshift({
    id: `log_${Date.now()}`,
    action,
    entity,
    timestamp: new Date().toISOString()
  });
}