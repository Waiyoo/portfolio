"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export interface GalleryMediaItem {
  id: string;
  url: string;
  altText: string;
  caption?: string | null;
  width: number;
  height: number;
}

interface LightboxGalleryProps {
  media: GalleryMediaItem[];
}

export const LightboxGallery: React.FC<LightboxGalleryProps> = ({ media }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % media.length);
  }, [selectedIndex, media.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + media.length) % media.length);
  }, [selectedIndex, media.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  if (media.length === 0) return null;

  const currentItem = selectedIndex !== null ? media[selectedIndex] : null;

  return (
    <div className="space-y-4">
      {/* Thumbnail Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {media.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setSelectedIndex(idx)}
            className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 hover:border-[#0B5D3B] hover:shadow-lg hover:shadow-slate-950/50 transition-all duration-300"
          >
            <Image
              src={item.url}
              alt={item.altText}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#090d16]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <Maximize2 className="h-5 w-5 text-slate-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Accessible Fullscreen Modal */}
      {currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          className="fixed inset-0 z-50 bg-[#090d16]/95 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-8"
        >
          {/* Header Controls */}
          <div className="w-full max-w-6xl flex items-center justify-between text-slate-100 font-mono text-xs border-b border-slate-800/80 pb-3">
            <span className="tracking-wider text-slate-400">
              SYSTEM_GALLERY :: <span className="text-slate-100 font-bold">{selectedIndex! + 1}</span> / {media.length}
            </span>
            <button
              onClick={() => setSelectedIndex(null)}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-[#0B5D3B] rounded-lg border border-slate-700/50 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Viewer Area */}
          <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center my-auto">
            <button
              onClick={handlePrev}
              className="absolute left-2 z-10 p-3 bg-slate-900/90 hover:bg-[#0B5D3B] text-slate-200 hover:text-white rounded-xl border border-slate-800 transition-all shadow-xl"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="relative w-full h-full max-h-full">
              <Image
                src={currentItem.url}
                alt={currentItem.altText}
                fill
                priority
                className="object-contain"
              />
            </div>

            <button
              onClick={handleNext}
              className="absolute right-2 z-10 p-3 bg-slate-900/90 hover:bg-[#0B5D3B] text-slate-200 hover:text-white rounded-xl border border-slate-800 transition-all shadow-xl"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Caption & Metadata */}
          {currentItem.caption && (
            <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-center text-xs font-mono text-slate-300 backdrop-blur-sm shadow-xl">
              {currentItem.caption}
            </div>
          )}
        </div>
      )}
    </div>
  );
};