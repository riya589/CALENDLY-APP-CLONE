import { CalendarCheck2, Clock3, Layers3, PlusCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAvailability } from "@/api/availability";
import { getPastBookings, getUpcomingBookings } from "@/api/bookings";
import { getEventTypes } from "@/api/event-types";
import { ErrorState } from "@/components/common/error-state";
import { LoadingState } from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DashboardStats } from "@/types";
import { parseApiError } from "@/utils/format";

const initialStats: DashboardStats = {
  totalEventTypes: 0,
  upcomingMeetings: 0,
  pastMeetings: 0,
  activeAvailabilityDays: 0
};

export function DashboardOverviewPage() {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [eventTypes, upcoming, past, availability] = await Promise.all([
        getEventTypes(),
        getUpcomingBookings(),
        getPastBookings(),
        getAvailability()
      ]);

      setStats({
        totalEventTypes: eventTypes.length,
        upcomingMeetings: upcoming.length,
        pastMeetings: past.length,
        activeAvailabilityDays: availability.availability.filter((item) => item.isAvailable).length
      });
    } catch (err) {
      setError(parseApiError(err, "Failed to load dashboard summary"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  if (loading) {
    return <LoadingState message="Loading dashboard summary..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => void loadData()} />;
  }

  const statCards = [
    { label: "Total event types", value: stats.totalEventTypes, icon: Layers3 },
    { label: "Upcoming meetings", value: stats.upcomingMeetings, icon: CalendarCheck2 },
    { label: "Past meetings", value: stats.pastMeetings, icon: Users },
    { label: "Active availability days", value: stats.activeAvailabilityDays, icon: Clock3 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Overview</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            A quick summary of event setup, meeting activity, and your weekly availability.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/event-types/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event Type
          </Link>
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="overflow-hidden p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <div className="rounded-2xl bg-secondary p-2.5 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-6 text-4xl font-bold text-foreground">{stat.value}</p>
            <div className="mt-5 h-1.5 rounded-full bg-slate-100">
              <div
                className="h-1.5 rounded-full bg-primary"
                style={{ width: `${Math.min(100, Math.max(18, stat.value * 18))}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden border-slate-200 bg-gradient-to-r from-[#0f2e57] to-[#145fa8] p-8 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">Quick setup</p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight">Keep your booking page ready to share</h3>
            <p className="mt-3 max-w-2xl text-base leading-8 text-blue-50">
              Create event types, define weekly availability, and review upcoming meetings from one consistent admin workspace.
            </p>
          </div>
          <Button asChild size="lg" className="bg-white text-[#0f2e57] hover:bg-slate-100">
            <Link to="/book/30-minute-meeting">Open Public Booking Page</Link>
          </Button>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        {[
          {
            title: "Create Event Type",
            description: "Set up new meeting templates with a public booking link.",
            href: "/dashboard/event-types/new"
          },
          {
            title: "Manage Availability",
            description: "Define recurring weekly hours and your preferred timezone.",
            href: "/dashboard/availability"
          },
          {
            title: "View Meetings",
            description: "Track upcoming bookings, review past ones, and cancel when needed.",
            href: "/dashboard/meetings"
          }
        ].map((action) => (
          <Card key={action.title} className="p-6">
            <h3 className="text-xl font-bold text-foreground">{action.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{action.description}</p>
            <Button className="mt-6" variant="outline" asChild>
              <Link to={action.href}>Open</Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
