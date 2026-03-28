import { CheckCircle2, Clock3, Globe2, Mail, UserCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CreatedBooking } from "@/types";
import { formatDateTime, formatTime } from "@/utils/format";

const BOOKING_STORAGE_KEY = "latest-booking";

export function BookingConfirmationPage() {
  const location = useLocation();
  const [booking, setBooking] = useState<CreatedBooking | null>(
    (location.state as { booking?: CreatedBooking } | null)?.booking ?? null
  );

  useEffect(() => {
    if (booking) {
      return;
    }

    const stored = sessionStorage.getItem(BOOKING_STORAGE_KEY);
    if (stored) {
      try {
        setBooking(JSON.parse(stored) as CreatedBooking);
      } catch {
        sessionStorage.removeItem(BOOKING_STORAGE_KEY);
      }
    }
  }, [booking]);

  const details = useMemo(() => {
    if (!booking) {
      return null;
    }

    return [
      {
        icon: UserCircle2,
        label: booking.organizer.name
      },
      {
        icon: Clock3,
        label: `${formatDateTime(booking.startDateTime, "EEEE, MMMM d, yyyy")} at ${formatTime(booking.startDateTime)}`
      },
      {
        icon: Globe2,
        label: booking.timezone
      },
      {
        icon: Mail,
        label: `${booking.inviteeName} - ${booking.inviteeEmail}`
      }
    ];
  }, [booking]);

  if (!booking || !details) {
    return (
      <div className="bg-slate-50 py-16">
        <div className="page-shell">
          <EmptyState
            title="No recent booking found"
            description="Complete a booking first to view the confirmation details here."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-16">
      <div className="page-shell max-w-3xl">
        <Card className="p-8 text-center sm:p-12">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Success</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">You are scheduled</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            A confirmation for <span className="font-semibold text-foreground">{booking.eventType.name}</span> has been created.
          </p>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left">
            <h2 className="text-2xl font-bold text-foreground">{booking.eventType.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{booking.eventType.duration} mins</p>
            <div className="mt-6 space-y-4">
              {details.map((detail) => (
                <div key={detail.label} className="flex items-center gap-3 text-sm text-slate-700">
                  <detail.icon className="h-5 w-5 text-primary" />
                  <span>{detail.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/book/${booking.eventType.slug}`}>Book Another Time</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
