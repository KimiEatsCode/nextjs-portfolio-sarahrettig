"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CourseProgress } from "@/lib/learning";

type Props = {
  slug: string;
  initialProgress?: CourseProgress | null;
};

export function CourseCompletionButton({ slug, initialProgress }: Props) {
  const [progress, setProgress] = useState(initialProgress);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const isFavorite = !!progress?.favorite;

  const handleClick = async () => {
    if (isSubmitting || isFavorite) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/courses/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      if (!response.ok) {
        throw new Error("Failed to save course completion");
      }

      const data = await response.json();
      setProgress(data.progress);
      
      // Refresh the page data to update progress everywhere
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      type="button"
      disabled={isSubmitting || isFavorite}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Course completed" : "Mark course complete"}
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
        isFavorite
          ? "border-rose-500 text-rose-200 hover:border-rose-400 hover:text-rose-100"
          : "border-zinc-700 text-zinc-200 hover:border-white hover:text-white"
      }`}
    >
      <Heart
        size={16}
        style={{
          fill: isFavorite ? "currentColor" : "none",
          strokeWidth: 1.75,
        }}
      />
      <span>{isFavorite ? "Completed" : "Mark course complete"}</span>
    </button>
  );
}
