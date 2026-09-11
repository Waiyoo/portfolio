import { Terminal } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact & Inquiries",
  description: "Initiate custom software, mobile app, or quantitative system engineering inquiries with Nickson Muriithi (RIITHIS).",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col space-y-12 pb-16">
      
      {/* HEADER */}
      <section className="pt-12 md:pt-16 border-b border-border bg-surface/30">
        <div className="container flex flex-col space-y-6 pb-12">
          
          <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-1 font-mono text-2xs text-brand w-fit">
            <Terminal className="h-3.5 w-3.5" />
            <span>COMMUNICATION_CHANNEL // CONTACT</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary font-sans">
              Start a Project Inquiry
            </h1>
            <p className="text-base sm:text-lg text-text-secondary font-sans leading-relaxed">
              Available for custom software development, mobile social-commerce applications, quantitative trading tools, and API integrations under the RIITHIS consultancy brand.
            </p>
            <Link href="/start-project" className="inline-flex items-center rounded-full border border-amber-700/40 bg-amber-950/30 px-4 py-2 font-mono text-xs font-semibold text-amber-200 transition hover:border-amber-500/70 hover:text-amber-300">
              Use the guided project estimator →
            </Link>
          </div>

        </div>
      </section>

      {/* FORM & DETAILS GRID */}
      <section className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PUBLIC FORM */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* SIDEBAR OPERATIONAL DETAILS */}
        <div className="space-y-6 font-sans text-xs">
          <div className="p-5 rounded border border-border bg-surface space-y-3">
            <span className="font-mono text-2xs text-brand uppercase tracking-wider block">
              OPERATIONAL_STATUS
            </span>
            <p className="text-text-secondary leading-relaxed">
              Accepting contract software engineering work and quantitative architecture consulting.
            </p>
            <div className="pt-2 border-t border-border-subtle space-y-1 font-mono text-2xs text-text-muted">
              <div>Timezone: East Africa Time (EAT / UTC+3)</div>
              <div>Location: Juja, Kiambu County, Kenya</div>
            </div>
          </div>

          <div className="p-5 rounded border border-border bg-surface-inset space-y-2 font-mono text-2xs text-text-muted">
            <span className="text-text-primary font-semibold block">Security & Privacy Note:</span>
            <p className="font-sans text-xs text-text-secondary">
              Submitted inquiry details are securely stored in the system database for operational evaluation and are never shared with third parties.
            </p>
          </div>
        </div>

      </section>

    </div>
  );
}
