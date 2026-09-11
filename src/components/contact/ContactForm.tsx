"use client";

import React, { useState } from "react";
import { Loader2, Send, CheckCircle2, AlertOctagon, Terminal } from "lucide-react";
import { ContactFormInput, contactFormSchema } from "@/lib/validations/contactSchema";
import { ContactApiResponse } from "@/types/contact";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<ContactFormInput>>({
    projectType: "custom_software",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseState, setResponseState] = useState<ContactApiResponse | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseState(null);

    // Client-side validation check
    const validation = contactFormSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const result: ContactApiResponse = await res.json();

      if (!res.ok || !result.success) {
        setResponseState({
          success: false,
          message: result.message || "Failed to submit inquiry.",
          errors: result.errors,
        });
        if (result.errors) setErrors(result.errors);
      } else {
        setResponseState(result);
        setFormData({ projectType: "custom_software" }); // Reset form
      }
    } catch {
      setResponseState({
        success: false,
        message: "Network error. Please verify your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-amber-900/30 bg-stone-950/80 backdrop-blur-xl shadow-2xl space-y-6 font-sans text-stone-200">
      
      {/* HEADER TERMINAL TITLE */}
      <div className="flex items-center gap-2 border-b border-amber-900/20 pb-3 font-mono text-3xs font-semibold uppercase tracking-widest text-amber-400">
        <Terminal className="h-4 w-4" />
        <span>INQUIRY_SUBMISSION_TERMINAL</span>
      </div>

      {/* SUCCESS BANNER */}
      {responseState?.success && (
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 space-y-1 font-mono text-xs shadow-sm">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>INQUIRY_RECEIVED // REF: {responseState.inquiryId}</span>
          </div>
          <p className="font-sans text-xs text-stone-300 font-light">{responseState.message}</p>
        </div>
      )}

      {/* GENERAL FAILURE BANNER */}
      {responseState && !responseState.success && (
        <div className="p-4 rounded-xl border border-rose-500/40 bg-rose-950/30 text-rose-400 space-y-1 font-mono text-xs shadow-sm">
          <div className="flex items-center gap-2 font-bold">
            <AlertOctagon className="h-4 w-4 text-rose-400" />
            <span>SUBMISSION_FAILED</span>
          </div>
          <p className="font-sans text-xs text-stone-300 font-light">{responseState.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        
        {/* MANDATORY FIELDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-mono text-3xs font-semibold text-stone-300 uppercase tracking-wider block">
              Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="e.g. Alex Mercer"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/60 border border-amber-900/30 text-stone-100 placeholder:text-stone-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all font-sans"
            />
            {errors.name && <span className="text-3xs text-rose-400 block font-mono mt-1">{errors.name}</span>}
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-3xs font-semibold text-stone-300 uppercase tracking-wider block">
              Email Address <span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="alex@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/60 border border-amber-900/30 text-stone-100 placeholder:text-stone-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all font-sans"
            />
            {errors.email && <span className="text-3xs text-rose-400 block font-mono mt-1">{errors.email}</span>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-mono text-3xs font-semibold text-stone-300 uppercase tracking-wider block">
            Project Type <span className="text-rose-400">*</span>
          </label>
          <select
            name="projectType"
            value={formData.projectType || "custom_software"}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/60 border border-amber-900/30 text-stone-100 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all font-sans"
          >
            <option value="custom_software" className="bg-stone-950 text-stone-200">Custom Software Development</option>
            <option value="web_application" className="bg-stone-950 text-stone-200">Web Application (Next.js / React)</option>
            <option value="mobile_app" className="bg-stone-950 text-stone-200">Mobile Application (React Native)</option>
            <option value="quant_trading_system" className="bg-stone-950 text-stone-200">Quantitative Trading Infrastructure</option>
            <option value="api_integration" className="bg-stone-950 text-stone-200">API Integration & Automation</option>
            <option value="other" className="bg-stone-950 text-stone-200">Other Scope</option>
          </select>
          {errors.projectType && <span className="text-3xs text-rose-400 block font-mono mt-1">{errors.projectType}</span>}
        </div>

        <div className="space-y-1.5">
          <label className="font-mono text-3xs font-semibold text-stone-300 uppercase tracking-wider block">
            Project Scope / Message <span className="text-rose-400">*</span>
          </label>
          <textarea
            name="message"
            rows={4}
            value={formData.message || ""}
            onChange={handleChange}
            placeholder="Outline your requirements, objectives, or current technical bottlenecks..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/60 border border-amber-900/30 text-stone-100 placeholder:text-stone-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all font-sans resize-none"
          />
          {errors.message && <span className="text-3xs text-rose-400 block font-mono mt-1">{errors.message}</span>}
        </div>

        {/* OPTIONAL FIELDS */}
        <div className="pt-3 border-t border-amber-900/20 space-y-4">
          <span className="font-mono text-3xs text-stone-500 uppercase tracking-widest block">
            OPTIONAL_CONTEXT_FIELDS
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-3xs text-stone-400 uppercase tracking-wider block">Organization / Brand</label>
              <input
                type="text"
                name="organization"
                value={formData.organization || ""}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/60 border border-amber-900/30 text-stone-100 placeholder:text-stone-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-3xs text-stone-400 uppercase tracking-wider block">Estimated Budget</label>
              <select
                name="budgetRange"
                value={formData.budgetRange || ""}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/60 border border-amber-900/30 text-stone-100 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all font-sans"
              >
                <option value="" className="bg-stone-950 text-stone-400">Select (Optional)</option>
                <option value="under_1k" className="bg-stone-950 text-stone-200">&lt; $1,000 USD</option>
                <option value="1k_3k" className="bg-stone-950 text-stone-200">$1,000 - $3,000 USD</option>
                <option value="3k_5k" className="bg-stone-950 text-stone-200">$3,000 - $5,000 USD</option>
                <option value="5k_plus" className="bg-stone-950 text-stone-200">$5,000+ USD</option>
                <option value="undisclosed" className="bg-stone-950 text-stone-200">Undisclosed / Flexible</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-3xs text-stone-400 uppercase tracking-wider block">Preferred Contact</label>
              <select
                name="preferredContactMethod"
                value={formData.preferredContactMethod || ""}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/60 border border-amber-900/30 text-stone-100 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all font-sans"
              >
                <option value="" className="bg-stone-950 text-stone-400">Select (Optional)</option>
                <option value="email" className="bg-stone-950 text-stone-200">Email</option>
                <option value="whatsapp" className="bg-stone-950 text-stone-200">WhatsApp</option>
                <option value="phone" className="bg-stone-950 text-stone-200">Direct Phone Call</option>
              </select>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-stone-950" />
              <span>TRANSMITTING_INQUIRY...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4 text-stone-950" />
              <span>TRANSMIT_INQUIRY</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
};