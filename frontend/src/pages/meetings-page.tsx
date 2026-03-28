import { Ban, Calendar, Clock3, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { cancelBooking, getPastBookings, getUpcomingBookings } from "@/api/bookings";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { LoadingState } from "@/components/common/loading-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import type { Booking } from "@/types";
import { formatDateTime, formatTime, parseApiError } from "@/utils/format";

export function MeetingsPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [upcoming, setUpcoming] = useState<Booking[]>([]);
  const [past, setPast] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const loadMeetings = async () => {
    try {
      setLoading(true);
      setError("");
      const [upcomingBookings, pastBookings] = await Promise.all([
        getUpcomingBookings(),
        getPastBookings()
      ]);

      setUpcoming(upcomingBookings);
      setPast(pastBookings);
    } catch (err) {
      setError(parseApiError(err, "Failed to load meetings"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadMeetings();
  }, []);

  const visibleBookings = useMemo(() => (tab === "upcoming" ? upcoming : past), [past, tab, upcoming]);

  const handleCancel = async () => {
    if (!selectedBooking) {
      return;
    }

    try {
      setCancelling(true);
      await cancelBooking(selectedBooking.id);
      toast.success("Meeting cancelled successfully");
      setSelectedBooking(null);
      await loadMeetings();
    } catch (err) {
      toast.error(parseApiError(err, "Failed to cancel booking"));
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading meetings..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => void loadMeetings()} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Meetings</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Review upcoming and past bookings, and cancel scheduled meetings when plans change.
          </p>
        </div>
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as "upcoming" | "past")}
          tabs={[
            { label: "Upcoming", value: "upcoming" },
            { label: "Past", value: "past" }
          ]}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm font-medium text-slate-500">Upcoming</p>
          <p className="mt-3 text-3xl font-bold text-foreground">{upcoming.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-medium text-slate-500">Past</p>
          <p className="mt-3 text-3xl font-bold text-foreground">{past.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-medium text-slate-500">Cancelled</p>
          <p className="mt-3 text-3xl font-bold text-foreground">
            {[...upcoming, ...past].filter((booking) => booking.status === "CANCELLED").length}
          </p>
        </Card>
      </div>

      {visibleBookings.length === 0 ? (
        <EmptyState
          title={tab === "upcoming" ? "No upcoming meetings" : "No past meetings"}
          description={
            tab === "upcoming"
              ? "New bookings will show up here once invitees schedule time."
              : "Completed meetings will appear here for reference."
          }
        />
      ) : (
        <div className="grid gap-5">
          {visibleBookings.map((booking) => (
            <Card key={booking.id} className="p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-foreground">{booking.eventType.name}</h3>
                    <Badge variant={booking.status === "CANCELLED" ? "destructive" : "default"}>
                      {booking.status === "CANCELLED" ? "Cancelled" : "Scheduled"}
                    </Badge>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      {booking.inviteeName} - {booking.inviteeEmail}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {formatDateTime(booking.startDateTime)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-primary" />
                      {formatTime(booking.startDateTime)} - {booking.eventType.duration} mins
                    </div>
                    <div className="text-slate-500">{booking.timezone}</div>
                  </div>
                </div>

                {tab === "upcoming" && booking.status !== "CANCELLED" ? (
                  <Button variant="outline" onClick={() => setSelectedBooking(booking)}>
                    <Ban className="mr-2 h-4 w-4" />
                    Cancel Meeting
                  </Button>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(selectedBooking)}
        title="Cancel this meeting?"
        description="The meeting will remain in your records but the slot will become available again for booking."
        confirmLabel="Cancel Meeting"
        isLoading={cancelling}
        onConfirm={() => void handleCancel()}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}
