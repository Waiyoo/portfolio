export interface ProjectRef {
  title: string;
  slug: string;
  context: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: "frontend" | "backend" | "integrations" | "data_systems";
  roleDescription: string;
  relatedProjects: ProjectRef[];
}

export interface SkillCategory {
  id: "frontend" | "backend" | "integrations" | "data_systems";
  title: string;
  label: string;
  description: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend & Mobile",
    label: "CLIENT_INTERFACES",
    description: "User interfaces, mobile application clients, and responsive web dashboards."
  },
  {
    id: "backend",
    title: "Backend Development",
    label: "SERVER_RUNTIMES",
    description: "Server-side business logic, application servers, and system services."
  },
  {
    id: "integrations",
    title: "Integrations & APIs",
    label: "EXTERNAL_SERVICES",
    description: "Payment networks, third-party APIs, and inter-process system bridges."
  },
  {
    id: "data_systems",
    title: "Data & Systems Engineering",
    label: "QUANT_&_STORAGE",
    description: "Database design, quantitative signal processing, and operational automation."
  }
];

export const SKILLS_DATA: SkillItem[] = [
  // FRONTEND
  {
    id: "react-native",
    name: "React Native",
    category: "frontend",
    roleDescription: "Cross-platform mobile client development for social feeds and shopping catalogs.",
    relatedProjects: [
      { title: "Riithis Clothing", slug: "riithis-clothing", context: "Mobile client application & cart state" }
    ]
  },
  {
    id: "react",
    name: "React / Next.js",
    category: "frontend",
    roleDescription: "Server-rendered web applications and interactive administrative dashboards.",
    relatedProjects: [
      { title: "Maxi's Garage", slug: "maxis-garage", context: "Garage operator portal & booking interface" },
      { title: "Quant Form", slug: "quant-form", context: "Market chart visualizer UI" }
    ]
  },
  {
    id: "javascript-ts",
    name: "JavaScript / TypeScript",
    category: "frontend",
    roleDescription: "Typed client/server interface contracts, dynamic component state, and async utilities.",
    relatedProjects: [
      { title: "Riithis Clothing", slug: "riithis-clothing", context: "Typed API payloads & state models" },
      { title: "Maxi's Garage", slug: "maxis-garage", context: "Next.js App Router & server actions" }
    ]
  },
  {
    id: "html-css",
    name: "HTML5 / CSS3 / TailwindCSS",
    category: "frontend",
    roleDescription: "High-density dark-themed design systems, CSS grid layouts, and responsive styling.",
    relatedProjects: [
      { title: "Maxi's Garage", slug: "maxis-garage", context: "Dashboard UI components" },
      { title: "Riithis Clothing", slug: "riithis-clothing", context: "Mobile layout styling" }
    ]
  },

  // BACKEND
  {
    id: "node-express",
    name: "Node.js / Express",
    category: "backend",
    roleDescription: "RESTful HTTP server endpoints, authentication middleware, and payment webhooks.",
    relatedProjects: [
      { title: "Riithis Clothing", slug: "riithis-clothing", context: "Core REST API & webhook listener" },
      { title: "Maxi's Garage", slug: "maxis-garage", context: "Backend business logic services" }
    ]
  },
  {
    id: "python",
    name: "Python",
    category: "backend",
    roleDescription: "Quantitative data modeling, market analysis engines, and IPC bridge connections.",
    relatedProjects: [
      { title: "Quant Form", slug: "quant-form", context: "Signal engine & indicator algorithms" }
    ]
  },

  // INTEGRATIONS
  {
    id: "apis-rest-ws",
    name: "APIs & Webhooks",
    category: "integrations",
    roleDescription: "Strict API schemas, JSON communication protocols, and real-time WebSockets.",
    relatedProjects: [
      { title: "Riithis Clothing", slug: "riithis-clothing", context: "Async M-Pesa webhook verification" },
      { title: "Quant Form", slug: "quant-form", context: "Real-time WebSocket market streaming" }
    ]
  },
  {
    id: "payment-mpesa",
    name: "Payment Integrations (M-Pesa API)",
    category: "integrations",
    roleDescription: "Safaricom Daraja API STK Push, Paybill C2B endpoints, and automated receipt matching.",
    relatedProjects: [
      { title: "Riithis Clothing", slug: "riithis-clothing", context: "Lipa Na M-Pesa STK Push" },
      { title: "Maxi's Garage", slug: "maxis-garage", context: "Paybill invoicing & transaction reconciliation" }
    ]
  },
  {
    id: "broker-mt5",
    name: "Broker & MT5 Integrations",
    category: "integrations",
    roleDescription: "MetaTrader 5 API IPC connectivity, raw market tick polling, and execution bridges.",
    relatedProjects: [
      { title: "Quant Form", slug: "quant-form", context: "Python MetaTrader 5 bridge" }
    ]
  },

  // DATA & SYSTEMS
  {
    id: "data-processing",
    name: "Data Processing & Analysis",
    category: "data_systems",
    roleDescription: "Vectorized array calculations, multi-timeframe resampling, and OHLC data cleaning.",
    relatedProjects: [
      { title: "Quant Form", slug: "quant-form", context: "Pandas & NumPy price structure engine" }
    ]
  },
  {
    id: "databases",
    name: "Database-Driven Applications",
    category: "data_systems",
    roleDescription: "Relational schema design (PostgreSQL) and document datastores (MongoDB Atlas).",
    relatedProjects: [
      { title: "Maxi's Garage", slug: "maxis-garage", context: "PostgreSQL job cards & inventory tables" },
      { title: "Riithis Clothing", slug: "riithis-clothing", context: "MongoDB users, catalogs, & orders" }
    ]
  },
  {
    id: "quant-systems",
    name: "Quantitative Systems & Signals",
    category: "data_systems",
    roleDescription: "Programmatic order block detection, Fair Value Gap rules, and structured JSON signals.",
    relatedProjects: [
      { title: "Quant Form", slug: "quant-form", context: "Institutional imbalance strategy engine" }
    ]
  }
];

export async function getSkillsData(): Promise<SkillItem[]> {
  // Simulates future DB or API fetch
  return SKILLS_DATA;
}