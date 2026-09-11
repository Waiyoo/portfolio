"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}

export function ActiveLink({
  href,
  children,
  className,
  activeClassName = "text-amber-300 font-semibold border-b-2 border-amber-400 bg-amber-500/10 rounded-t-md px-2 py-1",
  onClick,
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "font-mono text-xs transition-all duration-200 hover:text-stone-100",
        isActive ? activeClassName : "text-stone-400 hover:text-amber-300/80",
        className
      )}
    >
      {children}
    </Link>
  );
}