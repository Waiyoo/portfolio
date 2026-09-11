import { PrismaClient, ProjectStatus, TechCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Seed Categories
  const mobileCat = await prisma.projectCategory.upsert({
    where: { slug: 'mobile-social-commerce' },
    update: {},
    create: {
      name: 'Mobile Social-Commerce',
      slug: 'mobile-social-commerce',
      description: 'Full-stack mobile applications combining social interaction with digital commerce.',
    },
  });

  const quantCat = await prisma.projectCategory.upsert({
    where: { slug: 'quantitative-systems' },
    update: {},
    create: {
      name: 'Quantitative & Financial Systems',
      slug: 'quantitative-systems',
      description: 'Automated signal engines, market data processing, and broker API integration.',
    },
  });

  const serviceCat = await prisma.projectCategory.upsert({
    where: { slug: 'client-service-platforms' },
    update: {},
    create: {
      name: 'Client Service Platforms',
      slug: 'client-service-platforms',
      description: 'Business-to-customer interactive platforms and service management interfaces.',
    },
  });

  // 2. Seed Master Technologies
  const techMap: Record<string, string> = {};
  const technologies = [
    { name: 'React Native', slug: 'react-native', category: TechCategory.MOBILE, isCore: true },
    { name: 'Node.js', slug: 'nodejs', category: TechCategory.BACKEND, isCore: true },
    { name: 'HTML5', slug: 'html5', category: TechCategory.FRONTEND, isCore: false },
    { name: 'CSS3', slug: 'css3', category: TechCategory.FRONTEND, isCore: false },
    { name: 'JavaScript', slug: 'javascript', category: TechCategory.LANGUAGES, isCore: true },
    { name: 'Python', slug: 'python', category: TechCategory.LANGUAGES, isCore: true },
    { name: 'React', slug: 'react', category: TechCategory.FRONTEND, isCore: true },
    { name: 'M-Pesa API', slug: 'mpesa-api', category: TechCategory.PAYMENTS_APIS, isCore: true },
    { name: 'REST APIs', slug: 'rest-apis', category: TechCategory.PAYMENTS_APIS, isCore: true },
  ];

  for (const tech of technologies) {
    const created = await prisma.technology.upsert({
      where: { slug: tech.slug },
      update: {},
      create: tech,
    });
    techMap[tech.slug] = created.id;
  }

  // 3. Project 1: Riithis Clothing
  const riithisProject = await prisma.project.upsert({
    where: { slug: 'riithis-clothing' },
    update: {},
    create: {
      title: 'Riithis Clothing',
      slug: 'riithis-clothing',
      summary: 'A mobile social-commerce marketplace combining social post feeds with integrated clothing commerce.',
      detailedContext: 'Designed and engineered from the ground up over six months as a full-stack mobile marketplace application. Combines social engagement mechanics (following, messaging, likes) with end-to-end purchasing workflows and mobile payment integrations.',
      systemType: 'Mobile Social-Commerce Marketplace',
      status: ProjectStatus.COMPLETED_PROTOTYPE,
      published: true,
      featured: true,
      displayOrder: 1,
      duration: '> 6 Months',
      commercialStatusNote: 'Substantial full-stack mobile social-commerce prototype. The application was not ultimately deployed for live commercial use.',
      technicalChallenges: 'Architecting a cohesive data flow between real-time social messaging feeds, user post relations, inventory cataloging, and M-Pesa Buy Goods/Paybill API webhooks.',
      categoryId: mobileCat.id,
      technologies: {
        create: [
          { technologyId: techMap['react-native'] },
          { technologyId: techMap['nodejs'] },
          { technologyId: techMap['html5'] },
          { technologyId: techMap['css3'] },
          { technologyId: techMap['rest-apis'] },
          { technologyId: techMap['mpesa-api'] },
        ],
      },
      features: {
        create: [
          { title: 'User Profiles & Social Graph', description: 'User registration, profile management, and follow system.', displayOrder: 1 },
          { title: 'Social & Product Feed', description: 'Product posts, likes, comments, and direct messaging.', displayOrder: 2 },
          { title: 'Order & Checkout Pipeline', description: 'Product purchasing, order placement, and seller management dashboards.', displayOrder: 3 },
          { title: 'M-Pesa Payment Integration', description: 'Paybill and Buy Goods API transaction capability.', displayOrder: 4 },
        ],
      },
    },
  });

  // 4. Project 2: Quant Form
  const quantProject = await prisma.project.upsert({
    where: { slug: 'quant-form' },
    update: {},
    create: {
      title: 'Quant Form',
      slug: 'quant-form',
      summary: 'A quantitative trading strategy execution and automated signal-generation engine.',
      detailedContext: 'Engineered a Python-driven market data pipeline that ingests broker feeds, cleans and structures market pricing, applies algorithmic strategy rules, and outputs standardized JSON signal payloads.',
      systemType: 'Quantitative Trading Strategy & Signal Engine',
      status: ProjectStatus.COMPLETED_PROTOTYPE,
      published: true,
      featured: true,
      displayOrder: 2,
      commercialStatusNote: 'Functional automated signal generator and strategy execution prototype. Does not make live commercial claims regarding returns or performance.',
      technicalChallenges: 'Translating complex strategy specifications into structured computational logic while insulating execution through a clean web interface.',
      categoryId: quantCat.id,
      technologies: {
        create: [
          { technologyId: techMap['python'] },
          { technologyId: techMap['javascript'] },
          { technologyId: techMap['html5'] },
          { technologyId: techMap['css3'] },
          { technologyId: techMap['rest-apis'] },
        ],
      },
      features: {
        create: [
          { title: 'Market Data Processing', description: 'Automated data ingestion, cleaning, and strategy evaluation.', displayOrder: 1 },
          { title: 'JSON Signal Emission', description: 'Outputs trade execution payloads formatted for external broker interfaces.', displayOrder: 2 },
          { title: 'Control Dashboard', description: 'Web interface enabling users to toggle strategies and monitor operations without touching underlying code.', displayOrder: 3 },
        ],
      },
    },
  });

  // 5. Project 3: Maxis Garage
  const maxisProject = await prisma.project.upsert({
    where: { slug: 'maxis-garage' },
    update: {},
    create: {
      title: 'Maxis Garage',
      slug: 'maxis-garage',
      summary: 'Garage customer service interface and digital appointment booking platform.',
      detailedContext: 'Developed as a client engagement platform allowing automotive customers to book service appointments, order spare parts, and issue service requests online.',
      systemType: 'Garage Customer & Service Platform',
      status: ProjectStatus.PARTIALLY_COMPLETED,
      published: true,
      featured: false,
      displayOrder: 3,
      commercialStatusNote: 'Partially completed client platform prototype featuring an active frontend interface and Paybill API interface, without a dedicated completed backend.',
      technicalChallenges: 'Establishing clean client interactions and booking interfaces while working within client constraints.',
      categoryId: serviceCat.id,
      technologies: {
        create: [
          { technologyId: techMap['react'] },
          { technologyId: techMap['nodejs'] },
          { technologyId: techMap['html5'] },
          { technologyId: techMap['css3'] },
          { technologyId: techMap['javascript'] },
          { technologyId: techMap['mpesa-api'] },
        ],
      },
      features: {
        create: [
          { title: 'Appointment Scheduling', description: 'Customer interface for booking vehicle repair and maintenance slots.', displayOrder: 1 },
          { title: 'Spare Parts Catalog', description: 'Ordering workflow for garage parts and service requests.', displayOrder: 2 },
          { title: 'Paybill API Interface', description: 'Integration hook prepared for M-Pesa automated billing.', displayOrder: 3 },
        ],
      },
    },
  });

  console.log('Database successfully seeded with confirmed project records.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
