export interface ServiceOffering {
  id: string;
  title: string;
  category: "CUSTOM_SOFTWARE" | "WEB_MOBILE" | "APIS_INTEGRATIONS" | "BUSINESS_SYSTEMS" | "DATA_QUANT";
  shortDescription: string;
  problemSolved: string;
  deliverables: string[];
  systemIntegrationNote: string;
  technologies: string[];
}

export const SERVICE_CATEGORIES = [
  { id: "CUSTOM_SOFTWARE", title: "Custom Software Systems", label: "SYSTEMS_ENGINEERING" },
  { id: "WEB_MOBILE", title: "Web & Mobile Applications", label: "CLIENT_INTERFACE" },
  { id: "APIS_INTEGRATIONS", title: "APIs & Integrations", label: "DATA_PIPELINES" },
  { id: "BUSINESS_SYSTEMS", title: "Business & Operational Systems", label: "AUTOMATION" },
  { id: "DATA_QUANT", title: "Data & Quantitative Systems", label: "QUANT_ENGINES" },
] as const;

export const SERVICES_DATA: ServiceOffering[] = [
  {
    id: "custom-software-dev",
    title: "Tailored Software Architecture & Development",
    category: "CUSTOM_SOFTWARE",
    shortDescription: "End-to-end development of custom software systems aligned with specific business processes and operational logic.",
    problemSolved: "Off-the-shelf software often forces organizations into rigid workflows, creates data silos, and fails to support proprietary business models.",
    deliverables: [
      "Domain-driven system architecture and data models",
      "Custom server runtimes and background task workers",
      "Relational or document database schemas with migrations",
      "Role-based authorization and access control logic"
    ],
    systemIntegrationNote: "Serves as the foundation for complex business applications, providing clean APIs and modular schemas for future feature scaling.",
    technologies: ["Python", "TypeScript", "Node.js", "PostgreSQL", "MongoDB"]
  },
  {
    id: "mobile-app-dev",
    title: "Mobile Social & Commerce Platforms",
    category: "WEB_MOBILE",
    shortDescription: "Cross-platform mobile applications engineered for interactive user feeds, product catalogs, and transactional workflows.",
    problemSolved: "Businesses struggle to bridge mobile engagement with transaction capabilities, resulting in fragmented user experiences and lost conversions.",
    deliverables: [
      "React Native mobile apps for iOS and Android",
      "Real-time social feeds, user interactions, and media uploads",
      "Product catalogs, cart state management, and checkout flows",
      "Native device integration (notifications, offline storage)"
    ],
    systemIntegrationNote: "Connects directly with backend APIs, payment gateways like M-Pesa, and cloud media stores to deliver synchronized multi-device data.",
    technologies: ["React Native", "TypeScript", "Redux/Zustand", "REST APIs", "WebSockets"]
  },
  {
    id: "fullstack-web-apps",
    title: "Full-Stack Web Applications",
    category: "WEB_MOBILE",
    shortDescription: "High-performance web applications built for data-dense interfaces, operational dashboards, and customer portals.",
    problemSolved: "Slow, unoptimized web applications degrade user experience, introduce UI latency, and fail to handle high-frequency data updates.",
    deliverables: [
      "Server-rendered and client-hydrated Next.js web apps",
      "Interactive data tables, filters, and dynamic search flows",
      "Secure authentication flows (JWT, Session, OAuth)",
      "Dark-themed corporate/institutional dashboard interfaces"
    ],
    systemIntegrationNote: "Integrates frontend state management with structured backend API endpoints for responsive, low-latency user interfaces.",
    technologies: ["Next.js", "React", "TailwindCSS", "shadcn/ui", "React Query"]
  },
  {
    id: "api-webhook-architecture",
    title: "API Design & Integration Pipelines",
    category: "APIS_INTEGRATIONS",
    shortDescription: "Production-ready REST and WebSocket APIs designed for external service connections, payment handling, and system interoperability.",
    problemSolved: "Isolated systems lead to manual data re-entry, reconciliation errors, and broken communication between services.",
    deliverables: [
      "Strictly typed REST and OpenAPI specification endpoints",
      "M-Pesa Daraja payment integration (STK Push, B2C, C2B Callbacks)",
      "Webhook receiver logic with signature verification and retry queues",
      "Real-time WebSocket data streaming pipelines"
    ],
    systemIntegrationNote: "Acts as the connective tissue between third-party service providers, payment networks, and internal database records.",
    technologies: ["FastAPI", "Express", "M-Pesa API", "WebSockets", "JSON Schema"]
  },
  {
    id: "business-process-automation",
    title: "Business Systems & Workflow Automation",
    category: "BUSINESS_SYSTEMS",
    shortDescription: "Operational management tools designed to automate service workflows, scheduling, client records, and service tracking.",
    problemSolved: "Manual record-keeping, paper logs, and fragmented spreadsheets cause operational bottlenecks, billing errors, and lost efficiency.",
    deliverables: [
      "Automated service booking and status tracking modules",
      "Client profile management and interaction histories",
      "Inventory tracking, service logs, and automated invoice generation",
      "Role-tailored administrative and operator dashboards"
    ],
    systemIntegrationNote: "Digitizes physical and operational workflows into structured database state transitions with automated notification triggers.",
    technologies: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "TailwindCSS"]
  },
  {
    id: "quant-trading-engines",
    title: "Quantitative Strategy Engines & MT5 Connectors",
    category: "DATA_QUANT",
    shortDescription: "Algorithmic market analysis modules, automated execution engines, and custom MetaTrader 5 API connectors.",
    problemSolved: "Manual market execution suffers from emotional bias, slow execution speeds, and inability to systematically backtest rules.",
    deliverables: [
      "Quantitative signal algorithms based on price action metrics",
      "MetaTrader 5 Python bridge for real-time market data retrieval",
      "Custom indicator scripts and Expert Advisor (MQL5) logic",
      "Interactive chart rendering via TradingView Lightweight Charts"
    ],
    systemIntegrationNote: "Transforms market feeds into structured quantitative metrics, feeding live trading execution environments or visual dashboards.",
    technologies: ["Python", "MQL5", "MetaTrader 5 API", "Pandas", "Lightweight Charts"]
  }
];