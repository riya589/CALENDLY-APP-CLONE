import { Outlet } from "react-router-dom";

import { DashboardMobileNav, DashboardSidebar } from "@/components/common/dashboard-sidebar";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-foreground">
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white">
            <div className="px-6 py-6 sm:px-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Admin workspace</p>
                  <h1 className="mt-1 text-2xl font-bold text-foreground">Calendly Clone</h1>
                </div>
              </div>
              <div className="mt-5">
                <DashboardMobileNav />
              </div>
            </div>
          </header>
          <main className="flex-1 px-6 py-8 sm:px-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
