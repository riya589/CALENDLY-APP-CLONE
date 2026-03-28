import { Copy, PencilLine, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { deleteEventType, getEventTypes } from "@/api/event-types";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { LoadingState } from "@/components/common/loading-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { EventType } from "@/types";
import { buildBookingUrl, parseApiError } from "@/utils/format";

export function EventTypesListPage() {
  const navigate = useNavigate();
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(null);

  const loadEventTypes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getEventTypes();
      setEventTypes(data);
    } catch (err) {
      setError(parseApiError(err, "Failed to load event types"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadEventTypes();
  }, []);

  const sortedEventTypes = useMemo(
    () => [...eventTypes].sort((a, b) => a.name.localeCompare(b.name)),
    [eventTypes]
  );

  const handleDelete = async () => {
    if (!selectedEventType) {
      return;
    }

    try {
      setDeletingId(selectedEventType.id);
      await deleteEventType(selectedEventType.id);
      toast.success("Event type deleted successfully");
      setSelectedEventType(null);
      await loadEventTypes();
    } catch (err) {
      toast.error(parseApiError(err, "Failed to delete event type"));
    } finally {
      setDeletingId("");
    }
  };

  const handleCopy = async (slug: string) => {
    const url = buildBookingUrl(slug);
    await navigator.clipboard.writeText(url);
    toast.success("Booking link copied");
  };

  if (loading) {
    return <LoadingState message="Loading event types..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => void loadEventTypes()} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Event Types</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Create and manage public booking links for different meeting formats.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/event-types/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event Type
          </Link>
        </Button>
      </div>

      {sortedEventTypes.length === 0 ? (
        <EmptyState
          title="No event types yet"
          description="Create your first event type to start sharing bookable links."
          actionLabel="Create Event Type"
          onAction={() => navigate("/dashboard/event-types/new")}
        />
      ) : (
        <div className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-5">
              <p className="text-sm font-medium text-slate-500">Active event types</p>
              <p className="mt-3 text-3xl font-bold text-foreground">
                {sortedEventTypes.filter((item) => item.isActive).length}
              </p>
            </Card>
            <Card className="p-5">
              <p className="text-sm font-medium text-slate-500">Inactive event types</p>
              <p className="mt-3 text-3xl font-bold text-foreground">
                {sortedEventTypes.filter((item) => !item.isActive).length}
              </p>
            </Card>
            <Card className="p-5">
              <p className="text-sm font-medium text-slate-500">Shareable booking links</p>
              <p className="mt-3 text-3xl font-bold text-foreground">{sortedEventTypes.length}</p>
            </Card>
          </div>

          {sortedEventTypes.map((eventType) => (
            <Card key={eventType.id} className="p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: eventType.color ?? "#006bff" }}
                    />
                    <h3 className="text-2xl font-bold text-foreground">{eventType.name}</h3>
                    <Badge variant={eventType.isActive ? "default" : "secondary"}>
                      {eventType.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-slate-600">
                    {eventType.description || "No description added yet."}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                    <Badge variant="outline">{eventType.duration} mins</Badge>
                    <Badge variant="outline">/{eventType.slug}</Badge>
                    <a
                      href={buildBookingUrl(eventType.slug)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {buildBookingUrl(eventType.slug)}
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" onClick={() => void handleCopy(eventType.slug)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/dashboard/event-types/${eventType.id}/edit`}>
                      <PencilLine className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedEventType(eventType)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(selectedEventType)}
        title="Delete event type?"
        description="This will remove the event type and its booking link from the dashboard."
        confirmLabel="Delete"
        isLoading={deletingId.length > 0}
        onConfirm={() => void handleDelete()}
        onClose={() => setSelectedEventType(null)}
      />
    </div>
  );
}
