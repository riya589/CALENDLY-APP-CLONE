import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variant === "default" && "bg-secondary text-secondary-foreground",
        variant === "secondary" && "bg-slate-100 text-slate-700",
        variant === "destructive" && "bg-rose-100 text-rose-700",
        variant === "outline" && "border border-slate-200 bg-white text-slate-700",
        className
      )}
    >
      {children}
    </span>
  );
}
