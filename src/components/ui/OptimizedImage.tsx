"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageOff, Loader2 } from "lucide-react";

export interface OptimizedImageProps {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9" | "3/2";
  sizes?: string;
  className?: string;
  fallbackText?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 800,
  height = 450,
  priority = false,
  aspectRatio = "16/9",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className = "",
  fallbackText = "MEDIA_UNAVAILABLE",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClasses: Record<string, string> = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "21/9": "aspect-[21/9]",
    "3/2": "aspect-[3/2]",
  };

  const currentAspect = aspectClasses[aspectRatio] || "aspect-video";

  // Fallback for missing source or image load failure
  if (!src || hasError) {
    return (
      <div
        className={`relative w-full ${currentAspect} bg-stone-900/60 border border-stone-800/80 rounded-xl flex flex-col items-center justify-center p-4 gap-2 text-center select-none shadow-inner ${className}`}
      >
        <div className="p-2.5 rounded-lg bg-stone-950/80 border border-stone-800/60 text-stone-500">
          <ImageOff className="h-5 w-5" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500 font-medium">
          {hasError ? "ASSET_LOAD_ERROR" : fallbackText}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${currentAspect} overflow-hidden rounded-xl bg-stone-950/80 border border-stone-800/80 shadow-md ${className}`}
    >
      {/* Workstation Skeleton / Loading Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-900/80 animate-pulse flex flex-col items-center justify-center gap-2 z-10 backdrop-blur-xs">
          <Loader2 className="h-4 w-4 animate-spin text-amber-500/80" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 font-medium">
            LOADING_ASSET...
          </span>
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        decoding={priority ? "sync" : "async"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        sizes={sizes}
      />
    </div>
  );
};