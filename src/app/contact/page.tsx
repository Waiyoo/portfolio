import { Terminal, Clock, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact & Inquiries",
  description: "Initiate custom software, mobile app, or quantitative system engineering inquiries with Nickson Muriithi (RIITHIS).",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col space-y-16 pb-20">
      
      {/* ------------------------------------------------------------------- */}
      {/* 1. PAGE HEADER & TELEMETRY NAV                                     */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative pt-12 md:pt-16 border-b border-stone-800/80 bg-stone-900/40 backdrop-blur-md overflow-hidden">
        {/* Ambient Top Spotlight Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="container flex flex-col space-y-6 pb-12 relative z-10">
          
          {/* Telemetry Badge */}
          <div className="inline-flex items-center gap-2 rounded-lg border border-stone-800 bg-stone-950/80 px-3 py-1.5 font-mono text-[11px] text-amber-500 w-fit shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <Terminal className="h-3.5 w-3.5 text-amber-500" />
            <span className="tracking-widest uppercase">COMMUNICATION_CHANNEL // CONTACT</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-100 font-sans uppercase">
              Start a Project Inquiry
            </h1>
            <p className="text-base sm:text-lg text-stone-300/90 font-sans leading-relaxed">
              Available for custom software development, mobile social-commerce applications, quantitative trading tools, and API integrations under the RIITHIS consultancy brand.
            </p>
            
            <div className="pt-2">
              <Link 
                href="/start-project" 
                className="inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 font-mono text-xs font-semibold text-amber-300 transition-all hover:border-amber-500/70 hover:bg-amber-500/15 shadow-sm"
              >
                <span>Use the guided project estimator</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 2. FORM & OPERATIONAL DETAILS GRID                                 */}
      {/* ------------------------------------------------------------------- */}
      <section className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PUBLIC FORM */}
        <div className="lg:col-span-2 rounded-2xl border border-stone-800/80 bg-stone-900/60 backdrop-blur-md p-6 sm:p-8 shadow-xl">
          <ContactForm />
        </div>

        {/* SIDEBAR OPERATIONAL DETAILS */}
        <div className="space-y-6 font-sans">
          
          {/* Operational Status Card */}
          <div className="relative p-6 rounded-2xl border border-stone-800/80 bg-stone-900/60 backdrop-blur-md space-y-4 shadow-xl overflow-hidden group hover:border-amber-500/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold text-amber-500 uppercase tracking-widest relative z-10">
              <Terminal className="h-3.5 w-3.5 text-amber-500" />
              <span>SYS_STATUS :: OPERATIONAL</span>
            </div>

            <p className="text-xs sm:text-sm text-stone-300/90 leading-relaxed relative z-10">
              Accepting contract software engineering work and quantitative architecture consulting.
            </p>

            <div className="pt-4 border-t border-stone-800/80 space-y-2.5 font-mono text-xs text-stone-400 relative z-10">
              <div className="flex items-center gap-2.5">
                <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>Timezone: EAT (UTC+3)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>Location: Juja, Kenya</span>
              </div>
            </div>
          </div>

          {/* Security & Privacy Card */}
          <div className="p-6 rounded-2xl border border-stone-800/80 bg-stone-950/85 backdrop-blur-md space-y-3 shadow-xl">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-200 font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Security & Privacy Note</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-sans">
              Submitted inquiry details are securely stored in the system database for operational evaluation and are never shared with third parties.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}