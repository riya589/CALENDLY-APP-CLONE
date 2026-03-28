import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ title = "Something went wrong", message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-10 text-center">
      <AlertTriangle className="mx-auto h-10 w-10 text-rose-500" />
      <h3 className="mt-4 text-xl font-bold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{message}</p>
      {onRetry ? (
        <Button className="mt-5" variant="outline" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}

