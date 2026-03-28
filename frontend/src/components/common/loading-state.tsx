export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />
        <p className="text-sm font-medium text-slate-500">{message}</p>
      </div>
    </div>
  );
}

