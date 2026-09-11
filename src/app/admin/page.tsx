import { projectsStore, servicesStore, auditLogsStore } from "@/lib/store/adminStore";
import { inquiriesStore } from "@/lib/store/db";
import { FolderKanban, CheckCircle2, FileText, Inbox, Clock, Activity, Plus } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Dashboard Overview | RIITHIS Admin",
};

export default function AdminDashboardPage() {
  const totalProjects = projectsStore.length;
  const publishedProjects = projectsStore.filter((p) => p.status === "PUBLISHED").length;
  const draftProjects = projectsStore.filter((p) => p.status === "DRAFT").length;
  const totalInquiries = inquiriesStore.length;
  const recentInquiries = inquiriesStore.slice(0, 3);
  const recentLogs = auditLogsStore.slice(0, 5);

  return (
    <div className="flex min-h-screen bg-[#0C0A09] text-stone-200 font-sans selection:bg-amber-800/40 selection:text-amber-100 antialiased">

      <main className="flex-1 p-6 sm:p-8 space-y-8">
        
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-950/40 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-100">
              System Dashboard
            </h1>
            <p className="mt-1 text-2xs font-mono text-amber-400 font-semibold tracking-wider uppercase">
              OPERATIONAL_STATUS: ALL_SYSTEMS_ONLINE
            </p>
          </div>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 px-5 py-2.5 font-mono text-xs font-semibold text-stone-100 shadow-xl shadow-amber-950/40 border border-amber-600/30 transition-all duration-300 hover:shadow-amber-900/60 hover:scale-[1.02] w-fit"
          >
            <Plus className="h-3.5 w-3.5 text-amber-300" />
            <span>CREATE_PROJECT</span>
          </Link>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-amber-900/20 bg-stone-900/20 space-y-3 backdrop-blur-md transition-all duration-300 hover:border-amber-800/40">
            <div className="flex items-center justify-between font-mono text-2xs font-semibold tracking-wider text-stone-400">
              <span>TOTAL_PROJECTS</span>
              <FolderKanban className="h-4 w-4 text-amber-400" />
            </div>
            <span className="text-3xl font-bold text-stone-100 font-mono tracking-tight">{totalProjects}</span>
          </div>

          <div className="p-5 rounded-2xl border border-amber-900/20 bg-stone-900/20 space-y-3 backdrop-blur-md transition-all duration-300 hover:border-amber-800/40">
            <div className="flex items-center justify-between font-mono text-2xs font-semibold tracking-wider text-stone-400">
              <span>PUBLISHED</span>
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
            </div>
            <span className="text-3xl font-bold text-amber-400 font-mono tracking-tight">{publishedProjects}</span>
          </div>

          <div className="p-5 rounded-2xl border border-amber-900/20 bg-stone-900/20 space-y-3 backdrop-blur-md transition-all duration-300 hover:border-amber-800/40">
            <div className="flex items-center justify-between font-mono text-2xs font-semibold tracking-wider text-stone-400">
              <span>DRAFTS</span>
              <FileText className="h-4 w-4 text-amber-500/80" />
            </div>
            <span className="text-3xl font-bold text-amber-500/90 font-mono tracking-tight">{draftProjects}</span>
          </div>

          <div className="p-5 rounded-2xl border border-amber-900/20 bg-stone-900/20 space-y-3 backdrop-blur-md transition-all duration-300 hover:border-amber-800/40">
            <div className="flex items-center justify-between font-mono text-2xs font-semibold tracking-wider text-stone-400">
              <span>INQUIRIES</span>
              <Inbox className="h-4 w-4 text-amber-400" />
            </div>
            <span className="text-3xl font-bold text-stone-100 font-mono tracking-tight">{totalInquiries}</span>
          </div>
        </div>

        {/* RECENT ACTIVITY & INQUIRIES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Inquiries */}
          <div className="p-6 rounded-3xl border border-amber-800/30 bg-stone-950/80 space-y-5 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-amber-900/30 pb-3">
              <span className="font-mono text-2xs font-semibold text-amber-400 uppercase tracking-widest">Recent Contact Inquiries</span>
              <Link href="/admin/inquiries" className="font-mono text-3xs text-stone-400 hover:text-amber-300 transition-colors">
                VIEW_ALL ({totalInquiries})
              </Link>
            </div>

            {recentInquiries.length === 0 ? (
              <p className="text-xs text-stone-500 font-mono py-6 text-center">NO_RECORDED_INQUIRIES</p>
            ) : (
              <div className="space-y-3">
                {recentInquiries.map((inq) => (
                  <div key={inq.id} className="p-4 rounded-xl bg-stone-900/40 border border-amber-900/20 space-y-1.5 font-mono text-2xs transition-colors hover:border-amber-800/40">
                    <div className="flex justify-between font-semibold text-stone-200">
                      <span className="text-stone-100">{inq.name} <span className="text-amber-400/80 font-normal">({inq.projectType})</span></span>
                      <span className="text-stone-500 text-3xs">{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="font-sans text-xs text-stone-400 font-light line-clamp-1">{inq.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Audit Logs / Activity */}
          <div className="p-6 rounded-3xl border border-amber-800/30 bg-stone-950/80 space-y-5 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-amber-900/30 pb-3">
              <span className="font-mono text-2xs font-semibold text-amber-400 uppercase tracking-widest">System Audit Stream</span>
              <Activity className="h-4 w-4 text-amber-400" />
            </div>

            <div className="space-y-2.5 font-mono text-2xs">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-900/40 border border-amber-900/20 transition-colors hover:border-amber-800/40">
                  <div className="flex items-center gap-2.5">
                    <Clock className="h-3.5 w-3.5 text-amber-500/80 shrink-0" />
                    <span className="text-stone-200 font-semibold">{log.action}</span>
                    <span className="text-amber-400/70">[{log.entity}]</span>
                  </div>
                  <span className="text-3xs text-stone-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}