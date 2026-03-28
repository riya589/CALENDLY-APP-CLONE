import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <Inbox className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-foreground">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

