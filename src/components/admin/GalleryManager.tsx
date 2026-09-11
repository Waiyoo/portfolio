"use client";

import React, { useState } from "react";
import { Star, Eye, EyeOff, Trash2, ArrowUp, ArrowDown, Image as ImageIcon } from "lucide-react";

interface AdminMediaItem {
  id: string;
  url: string;
  altText: string;
  caption?: string;
  isFeatured: boolean;
  isVisible: boolean;
  order: number;
}

interface GalleryManagerProps {
  projectId: string;
  initialMedia: AdminMediaItem[];
  onUpdate: () => void;
}

export const GalleryManager: React.FC<GalleryManagerProps> = ({
  projectId,
  initialMedia,
  onUpdate,
}) => {
  const [media, setMedia] = useState<AdminMediaItem[]>(initialMedia);

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= media.length) return;

    const updated = [...media];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    const reordered = updated.map((item, idx) => ({ ...item, order: idx }));
    setMedia(reordered);

    // Sync reordering with API
    fetch(`/api/admin/projects/${projectId}/media/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: reordered.map((m) => ({ id: m.id, order: m.order })),
      }),
    }).then(() => onUpdate());
  };

  return (
    <div className="space-y-4 font-mono text-xs text-stone-200">
      
      {/* SECTION HEADER */}
      <div className="flex items-center gap-2 border-b border-amber-900/30 pb-2.5">
        <ImageIcon className="h-4 w-4 text-amber-400" />
        <span className="text-amber-400 font-bold uppercase tracking-wider text-2xs">
          PROJECT_MEDIA_REGISTRY
        </span>
        <span className="text-3xs text-stone-500 font-normal ml-auto">
          COUNT: {media.length}
        </span>
      </div>

      {/* MEDIA LIST */}
      {media.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-amber-900/20 bg-stone-900/20 text-stone-500 text-2xs space-y-1">
          <p className="font-semibold text-stone-400">NO_MEDIA_ATTACHED</p>
          <span className="font-sans font-light text-3xs text-stone-500 block">
            Upload images to populate the gallery registry.
          </span>
        </div>
      ) : (
        <div className="space-y-3">
          {media.map((item, idx) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900/30 border border-amber-900/20 hover:border-amber-700/40 p-3.5 rounded-xl backdrop-blur-md transition-all duration-300"
            >
              {/* ITEM META & THUMBNAIL */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-amber-800/30 bg-stone-950">
                  <img
                    src={item.url}
                    alt={item.altText || "Project Media"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="text-stone-100 font-semibold truncate font-sans text-xs">
                    {item.altText || "Untitled Asset"}
                  </div>
                  <div className="text-amber-400/70 text-3xs font-mono truncate">
                    {item.caption || "NO_CAPTION_PROVIDED"}
                  </div>
                </div>
              </div>

              {/* ACTION CONTROLS */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => moveItem(idx, "up")}
                  disabled={idx === 0}
                  title="Move Up"
                  className="p-2 bg-stone-950/60 hover:bg-amber-950/40 text-stone-300 hover:text-amber-300 rounded-lg border border-amber-900/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(idx, "down")}
                  disabled={idx === media.length - 1}
                  title="Move Down"
                  className="p-2 bg-stone-950/60 hover:bg-amber-950/40 text-stone-300 hover:text-amber-300 rounded-lg border border-amber-900/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  title={item.isFeatured ? "Featured Image" : "Set Featured"}
                  className={`p-2 rounded-lg border transition-colors ${
                    item.isFeatured
                      ? "bg-amber-950/50 border-amber-600/50 text-amber-300 shadow-sm shadow-amber-950/40"
                      : "bg-stone-950/60 border-amber-900/30 text-stone-500 hover:text-amber-400"
                  }`}
                >
                  <Star className="h-3.5 w-3.5 fill-current" />
                </button>
                <button
                  type="button"
                  title="Delete Asset"
                  className="p-2 bg-rose-950/30 hover:bg-rose-950/60 text-rose-400 rounded-lg border border-rose-900/40 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};