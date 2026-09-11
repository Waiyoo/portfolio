import { ProjectsGrid } from "@/components/sections/ProjectsGrid";

export const metadata = {
  title: "Projects",
  description: "Software engineering case studies, mobile social-commerce platforms, quantitative strategy engines, and business automation software.",
};

export default function ProjectsPage() {
  return <main className="pb-20"><section className="hero-grid border-b border-border-subtle"><div className="container py-16 sm:py-24"><p className="eyebrow">Selected work</p><h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Products designed to solve real operational problems.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-text-secondary">A growing collection of product concepts and software systems spanning commerce, operations, analytics, and customer experience.</p></div></section><section className="container py-16"><ProjectsGrid /></section></main>;
}
