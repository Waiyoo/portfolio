import { LoadingState } from "@/components/ui/loading-state";

export default function GlobalLoading() {
  return (
    <div className="container flex-1 flex items-center justify-center min-h-[60vh]">
      <LoadingState message="INITIALIZING_SYSTEM_ROUTE..." />
    </div>
  );
}