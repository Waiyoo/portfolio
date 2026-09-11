"use client";

import { useEffect } from "react";
import { StateMessage } from "@/components/ui/state-message";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route Runtime Error:", error);
  }, [error]);

  return (
    <div className="container flex-1 flex items-center justify-center min-h-[60vh] p-6">
      <StateMessage
        type="error"
        title="SYSTEM_EXCEPTION_CAPTURED"
        description={error.message || "An unexpected error occurred while rendering this route."}
        retryAction={reset}
      />
    </div>
  );
}