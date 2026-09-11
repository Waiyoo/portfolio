import { getAllInquiries } from "@/lib/store/db";
import { Inbox, Calendar, Mail, Building, DollarSign, Phone } from "lucide-react";

export const metadata = {
  title: "Inquiries Inspector | Admin",
};

export default async function AdminInquiriesPage() {
  const inquiries = await getAllInquiries();

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8 font-sans bg-[#0C0A09] text-stone-200 selection:bg-amber-800/40 selection:text-amber-100 min-h-screen antialiased">
      
      {/* HEADER */}
      <div className="border-b border-amber-950/40 pb-5 space-y-2">
        <div className="flex items-center gap-2 font-mono text-2xs font-semibold text-amber-400 uppercase tracking-widest">
          <Inbox className="h-4 w-4 text-amber-400" />
          <span>ADMINISTRATION // INQUIRIES_DATABASE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-100">
          Received Contact Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light">
          Total Recorded Inquiries in Datastore:{" "}
          <span className="font-mono text-amber-400 font-bold">{inquiries.length}</span>
        </p>
      </div>

      {/* INQUIRIES LIST */}
      {inquiries.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-amber-800/30 bg-stone-950/80 space-y-2 font-mono text-xs text-stone-400 shadow-2xl backdrop-blur-xl">
          <p className="text-amber-400/90 font-semibold">NO_INQUIRIES_FOUND_IN_DATASTORE</p>
          <span className="text-3xs font-sans text-stone-400 font-light block">
            Submissions through the public /contact form will appear here.
          </span>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="p-6 rounded-2xl border border-amber-900/20 bg-stone-900/20 space-y-4 font-xs backdrop-blur-md transition-all duration-300 hover:border-amber-700/40 hover:bg-stone-900/30"
            >
              
              {/* TOP BAR */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-900/20 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-stone-100">{inq.name}</span>
                  <span className="font-mono text-3xs px-2.5 py-0.5 rounded-full bg-amber-950/40 text-amber-300 border border-amber-700/30 font-medium">
                    {inq.projectType}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-3xs text-stone-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-amber-400/80" />
                    {new Date(inq.createdAt).toLocaleString()}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-stone-950/80 border border-amber-900/30 text-stone-400">
                    ID: {inq.id}
                  </span>
                </div>
              </div>

              {/* MESSAGE CONTENT */}
              <div className="space-y-1.5">
                <span className="font-mono text-3xs text-amber-400/80 uppercase tracking-wider block font-semibold">
                  Message Scope:
                </span>
                <p className="text-xs text-stone-300 leading-relaxed font-sans font-light bg-stone-950/60 p-4 rounded-xl border border-amber-900/20 shadow-inner">
                  {inq.message}
                </p>
              </div>

              {/* DETAILS ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-3xs text-stone-400 pt-3 border-t border-amber-900/20">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{inq.email}</span>
                </div>
                {inq.organization && (
                  <div className="flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{inq.organization}</span>
                  </div>
                )}
                {inq.budgetRange && (
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span>Budget: {inq.budgetRange}</span>
                  </div>
                )}
                {inq.preferredContactMethod && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span>Prefers: {inq.preferredContactMethod}</span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
