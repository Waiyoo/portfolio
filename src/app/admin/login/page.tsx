"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Lock, Key } from "lucide-react";

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified session key validation
    if (passcode === "riithis2026") {
      router.push("/admin");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0A09] text-stone-200 p-4 font-sans selection:bg-amber-800/40 selection:text-amber-100 antialiased relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-96 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600/10 blur-[130px]" />
      </div>

      <div className="w-full max-w-sm p-6 sm:p-8 rounded-3xl border border-amber-800/30 bg-stone-950/80 space-y-6 backdrop-blur-xl shadow-2xl relative z-10">
        
        {/* TOP TERMINAL BADGE */}
        <div className="flex items-center gap-2 border-b border-amber-900/30 pb-3.5 font-mono text-2xs font-semibold text-amber-400 tracking-widest uppercase">
          <Terminal className="h-4 w-4 text-amber-400" />
          <span>ADMINISTRATIVE_PORTAL</span>
        </div>

        {/* HEADER SECTION */}
        <div className="space-y-1.5 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-amber-950/30 border border-amber-700/30 text-amber-400 mb-2 shadow-inner">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-medium tracking-tight text-stone-100">
            Authenticate Session
          </h1>
          <p className="text-xs text-stone-400 font-mono font-light">
            Restricted to RIITHIS system operators.
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="p-3.5 rounded-xl border border-rose-800/50 bg-rose-950/30 text-rose-300 font-mono text-3xs text-center space-y-0.5">
            <span className="font-bold uppercase tracking-wider block">AUTHENTICATION_FAILED</span>
            <span className="text-rose-400/80">INVALID_PASSCODE_PROVIDED</span>
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
          <div className="space-y-1.5">
            <label className="text-3xs uppercase tracking-widest text-amber-400/80 font-semibold block">
              Session Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="••••••••••••"
                className="w-full p-2.5 pl-9 rounded-xl bg-stone-900/40 border border-amber-900/30 text-stone-100 placeholder:text-stone-600 focus:border-amber-500/70 focus:outline-none focus:ring-1 focus:ring-amber-500/40 transition-all font-mono text-xs"
              />
              <Key className="h-4 w-4 text-stone-500 absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 font-mono text-xs font-semibold text-stone-100 shadow-xl shadow-amber-950/40 border border-amber-600/30 transition-all duration-300 hover:shadow-amber-900/60 hover:scale-[1.01] active:scale-[0.99] tracking-wider"
          >
            AUTHORIZE_ACCESS
          </button>
        </form>

      </div>
    </div>
  );
}