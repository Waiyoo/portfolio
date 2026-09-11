"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleAlert, Loader2, MessageCircle, Send, Sparkles } from "lucide-react";
import { SYSTEM_META } from "@/lib/navigation-config";
import { ContactApiResponse } from "@/types/contact";

type Service = "website" | "ecommerce" | "system" | "mobile" | "integration" | "custom" | "unsure";
type Method = "email" | "phone" | "whatsapp";

const services: { id: Service; title: string; description: string }[] = [
  { id: "website", title: "Website", description: "A polished marketing, company, or service website." },
  { id: "ecommerce", title: "E-commerce", description: "A store, catalogue, checkout, and fulfilment experience." },
  { id: "system", title: "Business / Management System", description: "Tools that run operations, teams, records, and workflows." },
  { id: "mobile", title: "Mobile App", description: "A mobile product for customers, teams, or communities." },
  { id: "integration", title: "API / Integration", description: "Connect services, automate data, or build reliable APIs." },
  { id: "custom", title: "Custom Software", description: "A tailored platform or product with a unique workflow." },
  { id: "unsure", title: "Not sure yet", description: "Describe the outcome; we will help shape the right solution." },
];
const projectTypes: Record<Service, string[]> = {
  website: ["Business website", "Corporate/company website", "Portfolio", "Landing page", "Booking website", "E-commerce", "Other"],
  ecommerce: ["Online store", "Marketplace", "Product catalogue", "Subscription commerce", "Other"],
  system: ["School management", "Garage/automotive", "Inventory", "Finance", "SACCO/payment-related", "CRM/business management", "Trading/analytics", "Custom system", "Other"],
  mobile: ["Customer mobile app", "Service/booking app", "Commerce app", "Internal team app", "Other"],
  integration: ["Payment integration", "Third-party API integration", "Workflow automation", "Data migration/sync", "Custom API", "Other"],
  custom: ["Customer portal", "Operations platform", "Data/analytics product", "Marketplace", "Custom system", "Other"],
  unsure: ["I need help defining the project"],
};
const allFeatures = ["User accounts", "Admin dashboard", "Customer portal", "Payments", "M-Pesa", "SMS", "Email", "Booking/appointments", "Product management", "Orders", "Reports/analytics", "Notifications", "Messaging", "Other"];
const serviceFeatures: Record<Service, string[]> = {
  website: ["User accounts", "Customer portal", "Booking/appointments", "Email", "Reports/analytics", "Other"],
  ecommerce: ["User accounts", "Payments", "M-Pesa", "Product management", "Orders", "Email", "Notifications", "Other"],
  system: allFeatures,
  mobile: ["User accounts", "Payments", "M-Pesa", "Product management", "Orders", "Notifications", "Messaging", "Other"],
  integration: ["Admin dashboard", "Payments", "M-Pesa", "SMS", "Email", "Reports/analytics", "Notifications", "Other"],
  custom: allFeatures,
  unsure: ["User accounts", "Payments", "Booking/appointments", "Reports/analytics", "Other"],
};
const integrations = ["Bank/SACCO integration", "API integrations", "Accounting/ERP", "CRM", "Maps/location", "Existing system data", "None yet"];
const scales = ["Small / few users", "One organization", "Multiple departments/branches", "Large number of users", "Not sure"];
const steps = ["Service", "Project type", "Features", "Requirements", "Contact", "Review"];

function getEstimate(service: Service | "", type: string, featureCount: number, integrationCount: number, scale: string) {
  if (!service || service === "unsure") return { label: "Custom quotation", note: "We will review your goals and recommend an appropriate scope." };
  const advanced = featureCount + integrationCount >= 7 || scale === "Multiple departments/branches" || scale === "Large number of users";
  if (service === "website") {
    if (type === "Landing page" || (featureCount <= 2 && type === "Portfolio")) return { label: "KES 30,000 – 60,000", note: "Indicative range for a focused, professionally built website." };
    return type === "E-commerce" || advanced ? { label: "KES 150,000 – 350,000+", note: "Indicative range for an advanced website with commerce or operational features." } : { label: "KES 60,000 – 150,000", note: "Indicative range for a business or company website." };
  }
  if (service === "ecommerce") return { label: advanced ? "KES 300,000 – 750,000+" : "KES 150,000 – 350,000", note: "Indicative range for a commerce experience and its required operations." };
  if (service === "system" || service === "custom") {
    if (scale === "Large number of users" || (advanced && featureCount + integrationCount >= 9)) return { label: "KES 1,200,000 – 2,500,000+", note: "Enterprise-scale and mission-critical systems are scoped through a detailed quotation." };
    if (advanced) return { label: "KES 600,000 – 1,200,000", note: "Indicative range for an advanced multi-module system." };
    return featureCount + integrationCount >= 4 || scale === "One organization" ? { label: "KES 300,000 – 600,000", note: "Indicative range for a standard business system." } : { label: "KES 150,000 – 300,000", note: "Indicative range for a focused custom system." };
  }
  if (service === "mobile") return { label: advanced ? "KES 600,000 – 1,200,000+" : "KES 250,000 – 600,000", note: "Indicative range for a mobile product and its supporting services." };
  return { label: advanced ? "KES 300,000 – 800,000+" : "KES 150,000 – 350,000", note: "Indicative range for API work, integrations, and automation." };
}

export function ProjectEstimator() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | "">("");
  const [type, setType] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);
  const [scale, setScale] = useState("");
  const [requirements, setRequirements] = useState("");
  const [contact, setContact] = useState({ name: "", organization: "", phone: "", email: "", method: "email" as Method });
  const [error, setError] = useState("");
  const [emailOpened, setEmailOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseState, setResponseState] = useState<ContactApiResponse | null>(null);

  const serviceName = services.find((item) => item.id === service)?.title || "Not selected";
  const estimate = useMemo(() => getEstimate(service, type, features.length, selectedIntegrations.filter((item) => item !== "None yet").length, scale), [service, type, features, selectedIntegrations, scale]);
  const summary = `Project estimator request\n\nName: ${contact.name}\nCompany: ${contact.organization || "Not provided"}\nPhone/WhatsApp: ${contact.phone}\nEmail: ${contact.email}\nPreferred contact: ${contact.method}\n\nService: ${serviceName}\nProject type: ${type}\nFeatures: ${features.join(", ") || "None selected"}\nScale: ${scale || "Not applicable / not sure"}\nIntegrations: ${selectedIntegrations.join(", ") || "None selected"}\nEstimated range: ${estimate.label}\n\nRequirements:\n${requirements}`;
  const emailHref = `mailto:${SYSTEM_META.contactEmail}?subject=${encodeURIComponent(`Project enquiry: ${type || serviceName}`)}&body=${encodeURIComponent(summary)}`;
  const whatsappHref = SYSTEM_META.whatsappNumber ? `https://wa.me/${SYSTEM_META.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(summary)}` : "";
  const toggle = (item: string, values: string[], setValues: (values: string[]) => void) => setValues(values.includes(item) ? values.filter((value) => value !== item) : [...values, item]);
  const valid = () => step === 0 ? Boolean(service) : step === 1 ? Boolean(type) : step === 3 ? requirements.trim().length >= 10 : step !== 4 || (contact.name.trim().length >= 2 && contact.phone.trim().length >= 7 && /^\S+@\S+\.\S+$/.test(contact.email));
  const next = () => {
    if (!valid()) { setError(step === 3 ? "Tell us a little more about what you want the project to do." : "Please complete the required fields before continuing."); return; }
    setError(""); setStep((current) => Math.min(current + 1, steps.length - 1));
  };
  const submitInquiry = async () => {
    if (!valid()) {
      setError("Please complete your contact details before sending the inquiry.");
      return;
    }

    setError("");
    setResponseState(null);
    setIsSubmitting(true);
    const projectType = service === "mobile" ? "mobile_app" : service === "integration" ? "api_integration" : service === "website" || service === "ecommerce" ? "web_application" : service === "system" || service === "custom" ? "custom_software" : "other";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          organization: contact.organization || undefined,
          preferredContactMethod: contact.method,
          projectType,
          message: summary,
        }),
      });
      const result: ContactApiResponse = await response.json();
      if (!response.ok || !result.success) {
        setResponseState({ success: false, message: result.message || "We could not submit your inquiry. Please try again." });
        return;
      }
      setResponseState(result);
    } catch {
      setResponseState({ success: false, message: "Network error. Please verify your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <main className="min-h-screen bg-stone-950 pb-20 text-stone-200">
    <section className="border-b border-amber-900/30 bg-[radial-gradient(ellipse_at_top,rgba(180,83,9,.16),transparent_55%)]"><div className="container py-12 sm:py-16"><p className="font-mono text-2xs font-semibold uppercase tracking-[.2em] text-amber-400">Contact · project planner</p><h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-stone-100 sm:text-5xl">Plan your project and send one clear inquiry.</h1><p className="mt-4 max-w-2xl text-base leading-7 text-stone-400">A short guided brief gives you an indicative range, then securely submits the same complete project summary for review.</p></div></section>
    <section className="container py-8 sm:py-12"><div className="mx-auto max-w-4xl">
      <ol className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-6" aria-label="Project estimator progress">{steps.map((label, index) => <li key={label}><button type="button" onClick={() => index < step && setStep(index)} disabled={index > step} className="w-full text-left disabled:cursor-default"><span className={`mb-2 block h-1 rounded-full ${index <= step ? "bg-amber-400" : "bg-stone-800"}`} /><span className={`block truncate font-mono text-3xs uppercase ${index === step ? "text-amber-300" : "text-stone-500"}`}>{index + 1}. {label}</span></button></li>)}</ol>
      <div className="rounded-3xl border border-amber-900/30 bg-stone-900/40 p-5 shadow-2xl backdrop-blur sm:p-8">
        <div className="mb-7 flex items-start justify-between border-b border-amber-900/20 pb-5"><div><p className="font-mono text-2xs uppercase tracking-wider text-amber-400">Step {step + 1} of {steps.length}</p><h2 className="mt-1 text-xl font-semibold text-stone-100">{steps[step]}</h2></div><Sparkles className="h-5 w-5 text-amber-400" /></div>
        {step === 0 && <div className="grid gap-3 sm:grid-cols-2">{services.map((item) => <Card key={item.id} active={service === item.id} onClick={() => { setService(item.id); setType(""); setFeatures([]); }} title={item.title} description={item.description} />)}</div>}
        {step === 1 && service && <Options items={projectTypes[service]} selected={type} select={setType} />}
        {step === 2 && <div className="space-y-7"><Choices title="Select the functionality you need" hint="Choose all that apply. You can refine this later." items={service ? serviceFeatures[service] : allFeatures} selected={features} toggle={(item) => toggle(item, features, setFeatures)} /><Choices title="Integrations" hint="Connections that affect scope and planning." items={integrations} selected={selectedIntegrations} toggle={(item) => toggle(item, selectedIntegrations, setSelectedIntegrations)} /></div>}
        {step === 3 && <div className="space-y-6"><div><label htmlFor="requirements" className="text-sm font-medium text-stone-200">Tell us what you want the system or website to do <span className="text-amber-400">*</span></label><p className="mt-1 text-xs text-stone-500">The main objective, users, and any process you want to improve are enough to start.</p><textarea id="requirements" value={requirements} onChange={(event) => setRequirements(event.target.value)} rows={6} className="mt-3 w-full rounded-xl border border-amber-900/30 bg-stone-950/60 px-4 py-3 text-sm text-stone-100 focus:border-amber-500/70 focus:outline-none" placeholder="For example: We need a system that lets customers book services, allows staff to manage schedules, and sends confirmations by SMS." /></div>{(service === "system" || service === "custom") && <div><p className="text-sm font-medium text-stone-200">Expected scale</p><Options items={scales} selected={scale} select={setScale} /></div>}</div>}
        {step === 4 && <div className="grid gap-4 sm:grid-cols-2"><Field label="Name" value={contact.name} change={(value) => setContact({ ...contact, name: value })} required /><Field label="Company / organization" value={contact.organization} change={(value) => setContact({ ...contact, organization: value })} /><Field label="Phone / WhatsApp" value={contact.phone} change={(value) => setContact({ ...contact, phone: value })} type="tel" required /><Field label="Email" value={contact.email} change={(value) => setContact({ ...contact, email: value })} type="email" required /><div className="sm:col-span-2"><p className="text-sm font-medium text-stone-200">Preferred contact method</p><div className="mt-2 flex flex-wrap gap-2">{(["email", "whatsapp", "phone"] as Method[]).map((item) => <button type="button" key={item} onClick={() => setContact({ ...contact, method: item })} className={`rounded-full border px-4 py-2 text-sm capitalize ${contact.method === item ? "border-amber-400 bg-amber-950/50 text-amber-100" : "border-amber-900/30 text-stone-400"}`}>{item}</button>)}</div></div></div>}
        {step === 5 && <div className="space-y-6"><div className="rounded-2xl border border-amber-700/30 bg-amber-950/20 p-5"><p className="font-mono text-2xs uppercase tracking-wider text-amber-400">Estimated project range</p><p className="mt-2 text-2xl font-semibold text-stone-100 sm:text-3xl">{estimate.label}</p><p className="mt-2 text-sm leading-6 text-stone-400">{estimate.note} This is an estimated project range. Final pricing will be confirmed after reviewing the complete requirements.</p></div><Summary service={serviceName} type={type} features={features} integrations={selectedIntegrations} scale={scale} name={contact.name} email={contact.email} requirements={requirements} /></div>}
        {error && <p role="alert" className="mt-5 flex items-center gap-2 text-sm text-rose-300"><CircleAlert className="h-4 w-4" />{error}</p>}
        {responseState?.success && <div role="status" className="mt-5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-sm text-emerald-200"><div className="flex items-center gap-2 font-semibold"><CheckCircle2 className="h-4 w-4 text-emerald-400" />Inquiry received{responseState.inquiryId ? ` · Ref: ${responseState.inquiryId}` : ""}</div><p className="mt-1 text-stone-300">{responseState.message}</p></div>}
        {responseState && !responseState.success && <p role="alert" className="mt-5 flex items-center gap-2 text-sm text-rose-300"><CircleAlert className="h-4 w-4" />{responseState.message}</p>}
        {emailOpened && <p role="status" className="mt-5 flex items-center gap-2 text-sm text-emerald-300"><Check className="h-4 w-4" />Your email app has been opened with the complete project brief.</p>}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-amber-900/20 pt-5">{step > 0 ? <button type="button" onClick={() => { setError(""); setStep(step - 1); }} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-stone-400 hover:text-stone-100"><ArrowLeft className="h-4 w-4" />Back</button> : <span />}{step < steps.length - 1 ? <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400">Continue <ArrowRight className="h-4 w-4" /></button> : <div className="flex flex-wrap justify-end gap-3"><button type="button" onClick={submitInquiry} disabled={isSubmitting || responseState?.success} className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{isSubmitting ? "Sending inquiry…" : responseState?.success ? "Inquiry sent" : "Send inquiry"}</button><a href={emailHref} onClick={() => setEmailOpened(true)} className="inline-flex items-center gap-2 rounded-full border border-amber-700/50 px-5 py-3 text-sm font-semibold text-amber-200 hover:border-amber-400"><Send className="h-4 w-4" />Email a copy</a>{whatsappHref ? <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-amber-700/50 px-5 py-3 text-sm font-semibold text-amber-200 hover:border-amber-400"><MessageCircle className="h-4 w-4" />WhatsApp</a> : <button type="button" disabled title="Set NEXT_PUBLIC_WHATSAPP_NUMBER to activate WhatsApp." className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-amber-900/30 px-5 py-3 text-sm text-stone-500"><MessageCircle className="h-4 w-4" />WhatsApp</button>}</div>}</div>
      </div>
    </div></section>
  </main>;
}

function Card({ title, description, active, onClick }: { title: string; description: string; active: boolean; onClick: () => void }) { return <button type="button" onClick={onClick} className={`rounded-2xl border p-5 text-left transition ${active ? "border-amber-400 bg-amber-950/50" : "border-amber-900/30 bg-stone-950/40 hover:border-amber-700/60"}`}><span className="block text-base font-medium text-stone-100">{title}</span><span className="mt-1 block text-sm leading-5 text-stone-400">{description}</span></button>; }
function Options({ items, selected, select }: { items: string[]; selected: string; select: (item: string) => void }) { return <div className="mt-3 grid gap-2 sm:grid-cols-2">{items.map((item) => <button type="button" key={item} onClick={() => select(item)} className={`rounded-xl border px-4 py-3 text-left text-sm ${selected === item ? "border-amber-400 bg-amber-950/50 text-amber-100" : "border-amber-900/30 bg-stone-950/40 text-stone-300 hover:border-amber-700/60"}`}>{selected === item && <Check className="mr-2 inline h-4 w-4 text-amber-400" />}{item}</button>)}</div>; }
function Choices({ title, hint, items, selected, toggle }: { title: string; hint: string; items: string[]; selected: string[]; toggle: (item: string) => void }) { return <fieldset><legend className="text-sm font-medium text-stone-200">{title}</legend><p className="mt-1 text-xs text-stone-500">{hint}</p><div className="mt-3 flex flex-wrap gap-2">{items.map((item) => <button type="button" key={item} aria-pressed={selected.includes(item)} onClick={() => toggle(item)} className={`rounded-full border px-3 py-2 text-sm ${selected.includes(item) ? "border-amber-400 bg-amber-950/50 text-amber-100" : "border-amber-900/30 bg-stone-950/40 text-stone-400 hover:border-amber-700/60"}`}>{selected.includes(item) && <Check className="mr-1 inline h-3.5 w-3.5 text-amber-400" />}{item}</button>)}</div></fieldset>; }
function Field({ label, value, change, type = "text", required = false }: { label: string; value: string; change: (value: string) => void; type?: string; required?: boolean }) { return <label className="text-sm font-medium text-stone-200">{label}{required && <span className="text-amber-400"> *</span>}<input type={type} value={value} onChange={(event) => change(event.target.value)} className="mt-2 block w-full rounded-xl border border-amber-900/30 bg-stone-950/60 px-4 py-3 text-sm text-stone-100 focus:border-amber-500/70 focus:outline-none" /></label>; }
function Summary({ service, type, features, integrations, scale, name, email, requirements }: { service: string; type: string; features: string[]; integrations: string[]; scale: string; name: string; email: string; requirements: string }) { const rows = [["Service", service], ["Project type", type], ["Features", features.join(", ") || "None selected"], ["Integrations", integrations.join(", ") || "None selected"], ["Scale", scale || "Not applicable"], ["Contact", `${name} · ${email}`]]; return <div className="rounded-2xl border border-amber-900/25 bg-stone-950/40 p-5 text-sm"><p className="font-medium text-stone-100">Your project summary</p><dl className="mt-4 grid gap-3 sm:grid-cols-2">{rows.map(([label, value]) => <div key={label}><dt className="font-mono text-3xs uppercase text-stone-500">{label}</dt><dd className="mt-1 text-stone-300">{value}</dd></div>)}</dl><div className="mt-4 border-t border-amber-900/20 pt-4"><p className="font-mono text-3xs uppercase text-stone-500">Main objective</p><p className="mt-1 whitespace-pre-wrap leading-6 text-stone-300">{requirements}</p></div></div>; }
