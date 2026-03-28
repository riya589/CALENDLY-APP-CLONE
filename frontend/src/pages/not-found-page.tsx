import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="card-surface max-w-xl p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">Page not found</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          This route does not exist yet. Use the main navigation to continue exploring the project shell.
        </p>
        <Button className="mt-8" asChild size="lg">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}

