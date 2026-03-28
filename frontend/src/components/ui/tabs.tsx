import { cn } from "@/lib/utils";

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  tabs: Array<{ label: string; value: string }>;
};

export function Tabs({ value, onValueChange, tabs }: TabsProps) {
  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onValueChange(tab.value)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-semibold transition",
            value === tab.value ? "bg-white text-foreground shadow-sm" : "text-slate-500"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

