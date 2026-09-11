"use client";

import React, { useState } from "react";
import Image from "next/image";
import { generateProjectPlaceholderSVG } from "@/lib/media/placeholder";

interface ProjectImageProps {
  src?: string | null;
  alt: string;
  title?: string;
  category?: string;
  caption?: string | null;
  blurDataUrl?: string | null;
  priority?: boolean;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1";
  onClick?: () => void;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  title = "System Module",
  category = "SOFTWARE",
  caption,
  blurDataUrl,
  priority = false,
  className = "",
  aspectRatio = "16/9",
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fallbackPlaceholder = generateProjectPlaceholderSVG(title, category);
  const imageSrc = !src || hasError ? fallbackPlaceholder : src;

  const aspectClasses = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
  }[aspectRatio];

  return (
    <figure
      className={`relative overflow-hidden rounded-xl bg-stone-950/80 border border-stone-800/80 shadow-md transition-all duration-300 ${className}`}
    >
      <div className={`relative w-full ${aspectClasses}`}>
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          placeholder={blurDataUrl ? "blur" : "empty"}
          blurDataURL={blurDataUrl || undefined}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          onClick={onClick}
          className={`object-cover transition-all duration-500 ${
            !isLoaded && !hasError ? "scale-105 blur-sm" : "scale-100 blur-0"
          } ${
            onClick
              ? "cursor-pointer hover:scale-[1.02] active:scale-[0.99]"
              : ""
          }`}
        />

        {/* Workstation Skeleton Pulse */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-stone-900/80 animate-pulse pointer-events-none flex items-center justify-center">
            <span className="font-mono text-[10px] tracking-widest uppercase text-amber-500/60 font-medium">
              RENDERING_MODULE...
            </span>
          </div>
        )}
      </div>

      {/* Monospaced Caption Bar */}
      {caption && (
        <figcaption className="p-2.5 bg-stone-900/90 border-t border-stone-800/80 text-[11px] font-mono text-stone-300 text-center backdrop-blur-xs">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};