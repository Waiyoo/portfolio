export type ProjectStatus = "COMPLETED_PROTOTYPE" | "PARTIALLY_COMPLETED" | "PRODUCTION";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Mobile Social-Commerce" | "Trading & Quantitative Systems" | "Business Management Systems" | "Operations & Logistics" | "Customer Experience Platforms" | "Data Intelligence";
  categoryId: "mobile-commerce" | "quant-systems" | "business-automation" | "operations-logistics" | "customer-experience" | "data-intelligence";
  status: ProjectStatus;
  statusNote: string;
  summary: string;
  problemStatement: string;
  architecturalOverview: string;
  keyFeatures: string[];
  technologies: string[];
  metrics: ProjectMetric[];
  previewType: "code" | "architecture" | "workflow";
  previewSnippet?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "riithis-clothing",
    slug: "riithis-clothing",
    title: "Riithis Clothing",
    subtitle: "Mobile Social-Commerce Marketplace",
    category: "Mobile Social-Commerce",
    categoryId: "mobile-commerce",
    status: "COMPLETED_PROTOTYPE",
    statusNote: "Substantial full-stack prototype engineered for the Kenyan market. Not live commercially.",
    summary: "A mobile social-commerce marketplace combining interactive social post feeds with integrated clothing catalog commerce and local payment orchestration.",
    problemStatement: "Fashion vendors in Kenya traditionally rely on informal social media feeds for discovery and separate mobile money channels for payment, creating significant checkout friction and manual inventory tracking overhead.",
    architecturalOverview: "Engineered as a hybrid mobile client connected to a Node.js REST API. Features real-time post feeds, catalog browsing, and asynchronous M-Pesa Daraja payment callbacks for immediate order confirmation.",
    keyFeatures: [
      "Interactive social post feed with tagged product catalog overlays",
      "Seamless cart and multi-item checkout state management",
      "Direct M-Pesa Daraja STK Push payment integration",
      "Seller inventory management and order fulfillment tracking"
    ],
    technologies: ["React Native", "TypeScript", "Node.js", "Express", "M-Pesa Daraja API", "MongoDB"],
    metrics: [
      { label: "Engineering Effort", value: "> 6 Months" },
      { label: "Target Market", value: "Kenya (M-Pesa Native)" },
      { label: "System State", value: "Full Prototype" }
    ],
    previewType: "architecture",
    previewSnippet: `[Mobile Client: React Native] 
       │
       ├── (HTTPS / JSON) ──► [Express REST API]
       │                            │
       └── (STK Push) ──────► [M-Pesa Gateway] ──► [Callback Webhook] ──► [MongoDB]`
  },
  {
    id: "quant-form",
    slug: "quant-form",
    title: "Quant Form",
    subtitle: "Quantitative Trading Strategy & Signal Engine",
    category: "Trading & Quantitative Systems",
    categoryId: "quant-systems",
    status: "COMPLETED_PROTOTYPE",
    statusNote: "Functional automated signal generator prototype built for algorithmic strategy execution.",
    summary: "Quantitative trading strategy and signal engine designed for automated market analysis, order block calculation, and imbalance detection.",
    problemStatement: "Manual technical analysis suffers from emotional bias, slow execution, and inability to systematically evaluate order block formations across high-frequency tick data.",
    architecturalOverview: "Built as a modular Python signal processing core that interfaces with MetaTrader 5 via IPC bridges. Features automated market structure break (MSB) detection and dynamic stop-loss matrix calculation.",
    keyFeatures: [
      "Automated order block and fair value gap (FVG) detection engine",
      "Real-time MetaTrader 5 API price stream synchronization",
      "Dynamic risk-to-reward position sizing calculator",
      "WebSockets event emitter for live dashboard visualization"
    ],
    technologies: ["Python", "MetaTrader 5 API", "Pandas", "JavaScript", "WebSockets", "Lightweight Charts"],
    metrics: [
      { label: "Execution Model", value: "Tick-Level Analysis" },
      { label: "Latency Profile", value: "Sub-Second Signal" },
      { label: "Engine Status", value: "Verified Prototype" }
    ],
    previewType: "code",
    previewSnippet: `@dataclass(slots=True, frozen=True)
class OrderBlock:
    id: str
    symbol: str
    timeframe: str
    top_price: float
    bottom_price: float
    direction: str  # 'BULLISH' | 'BEARISH'
    mitigated: bool = False`
  },
  {
    id: "maxis-garage",
    slug: "maxis-garage",
    title: "Maxi's Garage",
    subtitle: "Business Automation & Management System",
    category: "Business Management Systems",
    categoryId: "business-automation",
    status: "PARTIALLY_COMPLETED",
    statusNote: "Core operational framework developed to streamline automotive workflow management.",
    summary: "Full-stack automotive service and garage operations management platform digitizing service tracking, customer billing, and vehicle repair histories.",
    problemStatement: "Independent automotive garages struggle with paper job cards, untracked inventory parts, delayed customer status updates, and manual revenue reconciliation.",
    architecturalOverview: "Designed with Next.js App Router and PostgreSQL to maintain strict relational mapping between customers, vehicle service records, job tasks, and parts inventory.",
    keyFeatures: [
      "Digital job card creation and real-time repair status pipeline",
      "Vehicle service history and owner record database",
      "Automated cost estimation and customer invoicing modules",
      "Parts inventory deduction upon repair job completion"
    ],
    technologies: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "TailwindCSS"],
    metrics: [
      { label: "Core Workflows", value: "Job Cards & Invoicing" },
      { label: "Database Core", value: "PostgreSQL Relational" },
      { label: "Development", value: "Framework Complete" }
    ],
    previewType: "workflow",
    previewSnippet: `[Vehicle Arrival] ──► [Digital Job Card] ──► [Parts Allocation] ──► [Service Completion] ──► [Invoice & Payment]`
  },
  {
    id: "stockroom-nexus", slug: "stockroom-nexus", title: "Stockroom Nexus", subtitle: "Inventory & Purchase Operations Platform", category: "Operations & Logistics", categoryId: "operations-logistics", status: "COMPLETED_PROTOTYPE", statusNote: "Product prototype demonstrating a modern inventory workflow for growing multi-location businesses.", summary: "An inventory control concept that brings stock movement, supplier orders, and low-stock decisions into one clear operational workspace.", problemStatement: "Growing businesses often reconcile stock through disconnected spreadsheets and paper receiving notes, leaving teams without a reliable view of what is on hand.", architecturalOverview: "Designed as a role-aware Next.js workspace with PostgreSQL inventory ledgers, auditable stock movements, and event-based reorder notifications.", keyFeatures: ["Multi-location stock movement ledger", "Supplier purchase order workflow", "Low-stock threshold and reorder alerts", "Role-specific receiving and approval views"], technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "TailwindCSS"], metrics: [{ label: "Focus", value: "Stock Accuracy" }, { label: "Workflow", value: "Purchase to Receive" }, { label: "State", value: "Product Prototype" }], previewType: "workflow"
  },
  {
    id: "clientlane", slug: "clientlane", title: "ClientLane", subtitle: "Service Booking & Customer Experience Portal", category: "Customer Experience Platforms", categoryId: "customer-experience", status: "COMPLETED_PROTOTYPE", statusNote: "Experience prototype focused on reducing booking friction and giving service teams a single customer view.", summary: "A client self-service portal for booking appointments, tracking requests, receiving updates, and managing recurring services.", problemStatement: "Service teams lose valuable time answering status questions across calls and chat, while customers lack a simple way to plan, update, or follow their requests.", architecturalOverview: "Structured as a responsive customer portal connected to an internal operations dashboard, with notification events and a unified customer timeline.", keyFeatures: ["Mobile-first appointment scheduling", "Customer request and status timeline", "Automated confirmation and reminder events", "Team dashboard for workload visibility"], technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "WebSockets"], metrics: [{ label: "Focus", value: "Customer Self-Service" }, { label: "Interface", value: "Mobile First" }, { label: "State", value: "Experience Prototype" }], previewType: "architecture"
  },
  {
    id: "insight-pulse", slug: "insight-pulse", title: "Insight Pulse", subtitle: "Business Metrics & Reporting Workspace", category: "Data Intelligence", categoryId: "data-intelligence", status: "PARTIALLY_COMPLETED", statusNote: "Dashboard framework and reporting interaction model developed for data-led operational teams.", summary: "A decision-support dashboard concept that translates raw operating data into focused trends, alerts, and weekly performance narratives.", problemStatement: "Leadership teams frequently receive data too late or in formats that make it difficult to identify changes, respond to risk, and take confident action.", architecturalOverview: "Built around a modular reporting layer with typed metrics, scheduled aggregation jobs, and lightweight data visualizations for distinct stakeholder roles.", keyFeatures: ["KPI scorecards with change indicators", "Scheduled metric aggregation layer", "Role-specific performance views", "Export-ready weekly reporting summaries"], technologies: ["TypeScript", "Python", "PostgreSQL", "Next.js", "Charting APIs"], metrics: [{ label: "Focus", value: "Decision Visibility" }, { label: "Data Model", value: "Typed Metrics" }, { label: "State", value: "Framework Complete" }], previewType: "code"
  }
];

// Async interface for future API/Database migration
export async function getProjects(): Promise<ProjectItem[]> {
  return PROJECTS_DATA;
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}
