import { CalendarClock, CalendarDays, LayoutGrid, Shapes, type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Logo } from "@/components/common/logo";
import { cn } from "@/lib/utils";
import { dashboardLinks } from "@/lib/constants";

const linkIcons: Record<string, LucideIcon> = {
  Overview: LayoutGrid,
  "Event Types": Shapes,
  Availability: CalendarClock,
  Meetings: CalendarDays
};

export function DashboardSidebar() {
  return (
    <aside className="hidden w-72 border-r border-slate-200 bg-white xl:block">
      <div className="sticky top-0 flex min-h-screen flex-col px-6 py-8">
        <Logo />
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Workspace</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Manage event links, availability, and bookings from one place.
          </p>
        </div>
        <div className="mt-10 space-y-2">
          {dashboardLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  "block rounded-xl px-4 py-3 text-sm font-semibold transition",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-slate-600 hover:bg-slate-100 hover:text-foreground"
                )
              }
            >
              <span className="flex items-center gap-3">
                {(() => {
                  const Icon = linkIcons[link.label];
                  return Icon ? <Icon className="h-4 w-4" /> : null;
                })()}
                {link.label}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
}

export function DashboardMobileNav() {
  return (
    <div className="overflow-x-auto xl:hidden">
      <div className="flex min-w-max gap-2 pb-2">
        {dashboardLinks.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              cn(
                "rounded-xl px-4 py-2 text-sm font-semibold transition",
                isActive ? "bg-secondary text-secondary-foreground" : "bg-white text-slate-600"
              )
            }
          >
            <span className="flex items-center gap-2">
              {(() => {
                const Icon = linkIcons[link.label];
                return Icon ? <Icon className="h-4 w-4" /> : null;
              })()}
              {link.label}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
