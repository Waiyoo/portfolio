export type CaseStudyStatus = "COMPLETED_PROTOTYPE" | "PARTIALLY_COMPLETED" | "IN_DEVELOPMENT";

export interface SystemIntegration {
  name: string;
  type: string;
  description: string;
}

export interface TechnicalChallenge {
  title: string;
  problem: string;
  resolution: string;
}

export interface ArchitectureComponent {
  layer: string;
  technologies: string[];
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: "Mobile Social-Commerce" | "Trading & Quantitative Systems" | "Business Management Systems";
  overview: string;
  objective: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  architectureDiagramText: string;
  architectureComponents: ArchitectureComponent[];
  technologies: string[];
  integrations: SystemIntegration[];
  myContribution: string[];
  technicalChallenges: TechnicalChallenge[];
  status: CaseStudyStatus;
  statusNote: string;
  limitations: string[];
  visualEvidencePlaceholder: {
    title: string;
    description: string;
    type: "mobile_flow" | "data_pipeline" | "dashboard_layout";
  };
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "riithis-clothing": {
    slug: "riithis-clothing",
    title: "Riithis Clothing",
    tagline: "Mobile Social-Commerce Marketplace for Fashion Retailers",
    category: "Mobile Social-Commerce",
    overview: "Riithis Clothing is a full-stack mobile social-commerce application designed to bridge post-based fashion discovery with integrated product purchasing and local mobile payment handling for fashion vendors in Kenya.",
    objective: "To eliminate friction between social media browsing and mobile transaction processing by combining a content-driven post feed with an integrated clothing store catalog and automated payment reconciliation.",
    problem: "Kenyan fashion micro-merchants traditionally advertise on unstructured social feeds (e.g., Instagram, WhatsApp) while collecting payments manually via mobile money transfers. This results in drop-offs, inventory overselling, and tedious manual accounting.",
    solution: "Engineered a React Native mobile application paired with a Node.js REST API. Customers browse an interactive media feed with direct product tagging, place orders, and pay via automated M-Pesa STK Push prompts, while merchants manage inventory through an integrated seller dashboard.",
    keyFeatures: [
      "Social Feed & Product Tagging: Infinite scrolling post feed with tagged product overlays.",
      "Customer Ordering Workflow: Shopping cart state management, delivery address input, and checkout orchestration.",
      "In-App Messaging: Buyer-to-seller communication channel for custom sizing and order inquiries.",
      "Seller Inventory Dashboard: Merchant interface for product uploads, stock tracking, and order fulfillment status.",
      "Automated M-Pesa Payment Handling: Push payment initiation with instant callback verification."
    ],
    architectureDiagramText: `
+-----------------------------------------------------------------------------------+
|                              MOBILE CLIENT (React Native)                          |
|  [ Social Post Feed ]    [ Product Catalog ]    [ Cart & Checkout ]    [ Seller Panel ] |
+----------------------------------------+------------------------------------------+
                                         | (HTTPS / JSON REST API)
                                         v
+-----------------------------------------------------------------------------------+
|                              BACKEND SERVER (Node.js / Express)                  |
|  [ Auth Middleware ]   [ Order Controller ]   [ Inventory Service ]   [ Webhook Handler ]|
+--------------------+-----------------------------------+--------------------------+
                     |                                   |
                     v                                   v
+------------------------------------+   +------------------------------------------+
|       DATABASE & MEDIA SERVICES    |   |           EXTERNAL PAYMENT GATEWAY       |
|  [ MongoDB Atlas ]  [ Cloudinary ] |   |   [ Safaricom M-Pesa Daraja STK Push API ]|
+------------------------------------+   +------------------------------------------+
`,
    architectureComponents: [
      {
        layer: "Mobile Client",
        technologies: ["React Native", "TypeScript", "Redux Toolkit", "Axios"],
        description: "Cross-platform mobile client handling user feeds, shopping cart state, and seller catalog management."
      },
      {
        layer: "Backend Server",
        technologies: ["Node.js", "Express.js", "JWT Authentication"],
        description: "REST API orchestrating order lifecycle transitions, authentication, and payment callback listeners."
      },
      {
        layer: "Data & Storage Services",
        technologies: ["MongoDB Atlas", "Mongoose", "Cloudinary API"],
        description: "Document database storing user profiles, orders, and products alongside external Cloudinary CDN media hosting."
      }
    ],
    technologies: ["React Native", "TypeScript", "Node.js", "Express", "MongoDB", "M-Pesa Daraja API", "Cloudinary"],
    integrations: [
      {
        name: "Safaricom M-Pesa Daraja API",
        type: "Payment Gateway",
        description: "Used STK Push (LIPA NA M-PESA Online) for prompt-based customer payment collection and async callback processing."
      },
      {
        name: "Cloudinary API",
        type: "Media CDN",
        description: "Handled user and merchant media uploads, image compression, and adaptive image delivery."
      }
    ],
    myContribution: [
      "Architected the React Native client navigation hierarchy and centralized Redux store.",
      "Implemented the Express REST API routes, JWT security middleware, and MongoDB schemas.",
      "Engineered the M-Pesa Daraja STK Push integration including asynchronous callback verification handlers."
    ],
    technicalChallenges: [
      {
        title: "Asynchronous Payment Callback Verification",
        problem: "M-Pesa payment confirmations occur asynchronously via webhooks, leading to potential race conditions between checkout UI updates and database order confirmation.",
        resolution: "Implemented a server-side callback verification endpoint that writes payment status directly to MongoDB and fires polling updates to the client app."
      },
      {
        title: "Mobile Media Feed Performance",
        problem: "High-resolution product image feeds caused list lag and excessive memory consumption on lower-end mobile devices.",
        resolution: "Applied image optimization transformations via Cloudinary and implemented lazy-loaded, windowed list rendering in React Native."
      }
    ],
    status: "COMPLETED_PROTOTYPE",
    statusNote: "The system was built and verified as a fully functional full-stack prototype over a 6-month period. It is not currently deployed as a live commercial application.",
    limitations: [
      "Lacks real-time push notification infrastructure (currently relies on polling for order updates).",
      "In-app messaging uses polling HTTP requests rather than a dedicated persistent WebSocket connection.",
      "Merchant analytics are limited to basic order tallies without automated sales forecasting."
    ],
    visualEvidencePlaceholder: {
      title: "Mobile Interface & Order Pipeline",
      description: "Interactive visual layout showing client feeds, cart state, and M-Pesa checkout callback flow.",
      type: "mobile_flow"
    }
  },

  "quant-form": {
    slug: "quant-form",
    title: "Quant Form",
    tagline: "Automated Quantitative Market Analysis & Signal Engine",
    category: "Trading & Quantitative Systems",
    overview: "Quant Form is a quantitative signal engine designed for systematic market analysis, automated price-action structure evaluation, and standardized signal formatting.",
    objective: "To eliminate emotional bias and manual delay in technical chart analysis by programmatically calculating institutional order blocks, fair value gaps (FVG), and liquidity sweeps.",
    problem: "Manual price action analysis across multiple timeframes is time-intensive and prone to human interpretation errors, inconsistent risk management, and missed execution windows.",
    solution: "Engineered a Python-based quantitative processing core that ingests raw candlestick data via MetaTrader 5 API IPC channels, detects structural market patterns, calculates dynamic position sizes, and outputs standardized JSON signal objects.",
    keyFeatures: [
      "Market Data Ingestion: Automated tick and OHLC candle fetching across configurable timeframes.",
      "Data Normalization & Cleaning: Programmatic cleaning and structure calculation using Pandas DataFrames.",
      "Institutional Strategy Rules: Algorithmic detection of Order Blocks, Fair Value Gaps, and Market Structure Breaks.",
      "Quantitative Signal Generator: Output of structured JSON signals containing entry, stop-loss, and multi-TP levels.",
      "Frontend Chart Visualizer: Lightweight web UI displaying price series alongside algorithmically identified zones."
    ],
    architectureDiagramText: `
+-----------------------------------------------------------------------------------+
|                               FINANCIAL MARKET FEED                               |
|                       [ MetaTrader 5 Terminal / Broker API ]                      |
+----------------------------------------+------------------------------------------+
                                         | (Python IPC / Native MT5 API Bridge)
                                         v
+-----------------------------------------------------------------------------------+
|                        QUANT FORM PROCESSING CORE (Python)                         |
|  [ Data Ingestion ]   [ Pandas Normalizer ]   [ Strategy Engine ]   [ Signal Formatter ]|
+----------------------------------------+------------------------------------------+
                                         | (Structured JSON Stream)
                                         v
+-----------------------------------------------------------------------------------+
|                             OUTPUT & INTERFACE LAYERS                             |
|  [ WebSockets Stream ] ──► [ Lightweight Charts UI ]   [ Structured JSON Logs ]   |
+-----------------------------------------------------------------------------------+
`,
    architectureComponents: [
      {
        layer: "Data Bridge & Ingestion",
        technologies: ["Python", "MetaTrader 5 Native API Module"],
        description: "Direct Python process connection with local MetaTrader 5 terminal for historical and tick data extraction."
      },
      {
        layer: "Quantitative Processing Core",
        technologies: ["Python 3.11", "Pandas", "NumPy", "Dataclasses"],
        description: "High-speed array processing engine evaluating price action patterns, market structure, and risk matrices."
      },
      {
        layer: "Signal & Visualization Interface",
        technologies: ["JavaScript", "TradingView Lightweight Charts", "WebSockets"],
        description: "Lightweight frontend rendering price data and programmatically generated trading zones in real-time."
      }
    ],
    technologies: ["Python", "MetaTrader 5 API", "Pandas", "NumPy", "JavaScript", "TradingView Lightweight Charts", "WebSockets"],
    integrations: [
      {
        name: "MetaTrader 5 Terminal API",
        type: "Brokerage Data Connection",
        description: "Inter-process communication bridge used to extract raw market ticks, OHLC history, and account parameters."
      }
    ],
    myContribution: [
      "Designed the vectorized Python strategy evaluation logic for order block and Fair Value Gap identification.",
      "Engineered the JSON signal object schema and risk calculation modules.",
      "Developed the WebSockets bridge and frontend TradingView Lightweight Charts rendering interface."
    ],
    technicalChallenges: [
      {
        title: "DataFrame Resampling Latency",
        problem: "Calculating multi-timeframe indicators over large historical datasets introduced execution delay during high-volatility market events.",
        resolution: "Optimized data processing by using NumPy array operations for repetitive mathematical calculations and caching static candle boundaries."
      },
      {
        title: "Handling Live Tick Spikes",
        problem: "Erroneous single-tick price spikes from feed noise triggered false structural break signals.",
        resolution: "Added confirmation filters requiring candle-close verification above structural levels before firing confirmed signals."
      }
    ],
    status: "COMPLETED_PROTOTYPE",
    statusNote: "Functional strategy engine prototype capable of generating JSON signals and displaying zones on a chart. Automated live trade execution directly to broker accounts is disabled.",
    limitations: [
      "Does not execute live broker orders automatically (signal emission and visualization only).",
      "Requires an active MetaTrader 5 desktop application instance running locally for real-time data feeding.",
      "Backtesting module is limited to single-asset evaluation runs rather than multi-asset portfolio tests."
    ],
    visualEvidencePlaceholder: {
      title: "Market Structure Engine & Signal Output",
      description: "Visual breakdown of candlestick charts with identified Order Blocks and structured JSON signal payloads.",
      type: "data_pipeline"
    }
  },

  "maxis-garage": {
    slug: "maxis-garage",
    title: "Maxi's Garage",
    tagline: "Operational Service & Garage Management Platform",
    category: "Business Management Systems",
    overview: "Maxi's Garage is a full-stack business automation system engineered to streamline customer service operations, vehicle repair bookings, inventory tracking, and payment processing for automotive garages.",
    objective: "To digitize physical paper job cards, automate customer service scheduling, track spare parts usage, and centralize garage revenue records in a single web application.",
    problem: "Automotive repair shops often struggle with paper-based scheduling, untracked spare parts inventory, misplaced vehicle service histories, and delayed billing reconciliation.",
    solution: "Developed a full-stack web application built on Next.js and PostgreSQL. Features digital appointment booking, service tracking pipelines, spare parts inventory deduction, and Paybill API integration for client invoicing.",
    keyFeatures: [
      "Customer Self-Service Booking: Client portal for selecting garage services and scheduling repair appointments.",
      "Digital Job Card Pipeline: Operational dashboard for mechanics to log vehicle diagnostics, assigned tasks, and repair updates.",
      "Spare Parts Inventory Tracking: Automatic deduction of garage parts inventory upon job card completion.",
      "Billing & Invoice Generation: Automated invoice calculation combining labor costs and utilized spare parts.",
      "M-Pesa Paybill Integration: Direct mobile money collection for closed customer job cards."
    ],
    architectureDiagramText: `
+-----------------------------------------------------------------------------------+
|                               WEB CLIENT (Next.js)                                |
|    [ Service Booking Portal ]   [ Garage Operator Panel ]   [ Invoicing Views ]   |
+----------------------------------------+------------------------------------------+
                                         | (HTTPS / Server Actions / REST)
                                         v
+-----------------------------------------------------------------------------------+
|                               APPLICATION BACKEND                                 |
|  [ Auth Service ]   [ Appointment Engine ]   [ Inventory Module ]   [ Paybill API ]   |
+--------------------+-----------------------------------+--------------------------+
                     |                                   |
                     v                                   v
+------------------------------------+   +------------------------------------------+
|          PRIMARY DATABASE          |   |            PAYMENT GATEWAY               |
|      [ PostgreSQL Relational ]     |   |    [ M-Pesa Paybill / C2B API Integration]|
+------------------------------------+   +------------------------------------------+
`,
    architectureComponents: [
      {
        layer: "Frontend & Application Layer",
        technologies: ["TypeScript", "Next.js (App Router)", "TailwindCSS"],
        description: "Server-rendered user interfaces for client booking and administrative garage workflows."
      },
      {
        layer: "Database Layer",
        technologies: ["PostgreSQL", "Prisma ORM"],
        description: "Relational database maintaining strict relationships between customers, vehicles, appointments, job cards, and inventory."
      },
      {
        layer: "External Integrations",
        technologies: ["M-Pesa Daraja C2B / Paybill API"],
        description: "Mobile payment handler connecting customer invoices to business Paybill numbers."
      }
    ],
    technologies: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Prisma", "TailwindCSS", "M-Pesa API"],
    integrations: [
      {
        name: "M-Pesa Paybill / C2B API",
        type: "Mobile Payment Collection",
        description: "Configured for customer bill payment handling against specific job card reference numbers."
      }
    ],
    myContribution: [
      "Designed the relational database schema mapping clients, vehicles, service logs, and inventory.",
      "Built the Next.js administrative dashboard for garage operator management.",
      "Implemented invoice generation logic tying parts usage and labor rates together."
    ],
    technicalChallenges: [
      {
        title: "Relational State Consistency Across Inventory & Jobs",
        problem: "Canceling or modifying active repair jobs required reverting reserved inventory items without corrupting billing records.",
        resolution: "Utilized atomic database transactions in PostgreSQL to ensure inventory counts and job card costs remain perfectly synchronized."
      }
    ],
    status: "PARTIALLY_COMPLETED",
    statusNote: "The core database architecture, job card management flows, and administrative UI are fully built. Customer SMS notification triggers and advanced reporting analytics remain in progress.",
    limitations: [
      "Customer SMS status updates (e.g., 'Vehicle Ready for Pickup') are currently unintegrated.",
      "Multi-branch garage management is not supported in the current database schema.",
      "Automated vendor re-ordering for low-stock spare parts is not implemented."
    ],
    visualEvidencePlaceholder: {
      title: "Garage Management Dashboard & Invoicing",
      description: "Interface layout showcasing appointment scheduling, digital job cards, and Paybill payment tracking.",
      type: "dashboard_layout"
    }
  }
};