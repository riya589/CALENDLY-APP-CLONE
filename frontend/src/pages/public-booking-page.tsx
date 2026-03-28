import { zodResolver } from "@hookform/resolvers/zod";
import { format, startOfToday } from "date-fns";
import { CalendarDays, Clock3, Globe2, UserCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { createBooking, getPublicEvent, getPublicSlots } from "@/api/public";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { FormField } from "@/components/common/form-field";
import { LoadingState } from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { bookingFormSchema, type BookingFormValues } from "@/lib/schemas";
import type { CreatedBooking, PublicEvent } from "@/types";
import { formatDateTime, parseApiError } from "@/utils/format";

const BOOKING_STORAGE_KEY = "latest-booking";

export function PublicBookingPage() {
  const navigate = useNavigate();
  const { slug = "" } = useParams();
  const [event, setEvent] = useState<PublicEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(startOfToday());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      inviteeName: "",
      inviteeEmail: ""
    }
  });

  const selectedDateString = useMemo(
    () => (selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""),
    [selectedDate]
  );

  const loadEvent = async () => {
    try {
      setLoadingEvent(true);
      setError("");
      const data = await getPublicEvent(slug);
      setEvent(data);
    } catch (err) {
      setError(parseApiError(err, "Failed to load booking page"));
    } finally {
      setLoadingEvent(false);
    }
  };

  const loadSlots = async (date: string) => {
    if (!slug) {
      return;
    }

    try {
      setLoadingSlots(true);
      const data = await getPublicSlots(slug, date);
      setSlots(data.slots);
    } catch (err) {
      toast.error(parseApiError(err, "Failed to load time slots"));
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    void loadEvent();
  }, [slug]);

  useEffect(() => {
    if (!selectedDateString) {
      return;
    }

    setSelectedTime("");
    void loadSlots(selectedDateString);
  }, [selectedDateString]);

  const onSubmit = form.handleSubmit(async (values) => {
    if (!event || !selectedDateString || !selectedTime) {
      toast.error("Please choose a date and time slot first");
      return;
    }

    try {
      setSubmitting(true);
      const booking = await createBooking({
        eventTypeId: event.id,
        inviteeName: values.inviteeName,
        inviteeEmail: values.inviteeEmail,
        date: selectedDateString,
        time: selectedTime,
        timezone: event.organizer.timezone
      });

      persistLatestBooking(booking);
      toast.success("Booking confirmed successfully");
      navigate(`/book/${slug}/confirm`, { state: { booking } });
    } catch (err) {
      toast.error(parseApiError(err, "Failed to create booking"));
      void loadSlots(selectedDateString);
    } finally {
      setSubmitting(false);
    }
  });

  if (loadingEvent) {
    return (
      <div className="bg-slate-50 py-16">
        <div className="page-shell">
          <LoadingState message="Loading booking page..." />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="bg-slate-50 py-16">
        <div className="page-shell">
          <ErrorState message={error || "Failed to load booking page"} onRetry={() => void loadEvent()} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-10 sm:py-16">
      <div className="page-shell">
        <Card className="overflow-hidden border-slate-200">
          <div className="grid lg:grid-cols-[360px_1fr]">
            <div className="border-b border-slate-200 bg-white p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Calendly-style booking
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">{event.name}</h1>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <UserCircle2 className="h-5 w-5 text-primary" />
                  <span>{event.organizer.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-primary" />
                  <span>{event.duration} mins</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe2 className="h-5 w-5 text-primary" />
                  <span>{event.organizer.timezone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <span>
                    {selectedDate ? formatDateTime(selectedDate, "EEEE, MMMM d, yyyy") : "Choose a date"}
                  </span>
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-600">
                {event.description || "A focused conversation designed to help you move work forward quickly."}
              </p>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-500">Selected slot</p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {selectedTime ? `${selectedTime} on ${formatDateTime(selectedDate ?? new Date(), "EEE, MMM d")}` : "Choose a time to continue"}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8">
              <div className="grid gap-8 xl:grid-cols-[minmax(320px,380px)_minmax(260px,1fr)]">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Select a Date</h2>
                  <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={{ before: startOfToday() }}
                      className="mx-auto"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      {selectedDate ? formatDateTime(selectedDate, "EEEE, MMM d") : "Available slots"}
                    </h2>
                    <div className="mt-4">
                      {loadingSlots ? (
                        <LoadingState message="Loading available slots..." />
                      ) : slots.length === 0 ? (
                        <EmptyState
                          title="No slots available for this date"
                          description="Try selecting another day to see open time slots."
                        />
                      ) : (
                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                          {slots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                                selectedTime === slot
                                  ? "border-primary bg-secondary text-primary"
                                  : "border-blue-200 text-primary hover:bg-secondary"
                              }`}
                              onClick={() => setSelectedTime(slot)}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedTime ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <h3 className="text-lg font-bold text-foreground">Enter your details</h3>
                      <p className="mt-2 text-sm text-slate-600">
                        You selected {selectedTime} on {formatDateTime(selectedDate ?? new Date(), "EEEE, MMM d")}.
                      </p>
                      <form className="mt-6 space-y-5" onSubmit={onSubmit}>
                        <FormField
                          label="Name"
                          htmlFor="inviteeName"
                          error={form.formState.errors.inviteeName?.message}
                        >
                          <Input id="inviteeName" placeholder="Your name" {...form.register("inviteeName")} />
                        </FormField>
                        <FormField
                          label="Email"
                          htmlFor="inviteeEmail"
                          error={form.formState.errors.inviteeEmail?.message}
                        >
                          <Input
                            id="inviteeEmail"
                            type="email"
                            placeholder="you@example.com"
                            {...form.register("inviteeEmail")}
                          />
                        </FormField>
                        <Button type="submit" className="w-full" disabled={submitting}>
                          {submitting ? "Confirming..." : "Confirm Booking"}
                        </Button>
                      </form>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function persistLatestBooking(booking: CreatedBooking) {
  sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(booking));
}
