import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getAvailability, updateAvailability } from "@/api/availability";
import { ErrorState } from "@/components/common/error-state";
import { LoadingState } from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { timezoneOptions, weekdays } from "@/lib/constants";
import type { AvailabilityResponse } from "@/types";
import { parseApiError } from "@/utils/format";

type AvailabilityFormState = {
  timezone: string;
  availability: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }>;
};

export function AvailabilityPage() {
  const [data, setData] = useState<AvailabilityFormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadAvailability = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAvailability();
      setData(mapAvailabilityResponse(response));
    } catch (err) {
      setError(parseApiError(err, "Failed to load availability"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAvailability();
  }, []);

  const handleDayChange = (
    dayOfWeek: number,
    key: "startTime" | "endTime" | "isAvailable",
    value: string | boolean
  ) => {
    setData((current) =>
      current
        ? {
            ...current,
            availability: current.availability.map((item) =>
              item.dayOfWeek === dayOfWeek ? { ...item, [key]: value } : item
            )
          }
        : current
    );
  };

  const handleSave = async () => {
    if (!data) {
      return;
    }

    const hasInvalidTimeRange = data.availability.some(
      (item) => item.isAvailable && item.startTime >= item.endTime
    );

    if (hasInvalidTimeRange) {
      toast.error("Each available day must have an end time later than its start time");
      return;
    }

    try {
      setSaving(true);
      await updateAvailability(data);
      toast.success("Availability updated successfully");
      await loadAvailability();
    } catch (err) {
      toast.error(parseApiError(err, "Failed to save availability"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading availability..." />;
  }

  if (error || !data) {
    return <ErrorState message={error || "Failed to load availability"} onRetry={() => void loadAvailability()} />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Availability</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Set the recurring weekly hours shown on your booking pages.
        </p>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="grid gap-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Available days</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {data.availability.filter((item) => item.isAvailable).length}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Timezone</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{data.timezone}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Recurring schedule</p>
              <p className="mt-2 text-lg font-semibold text-foreground">Weekly availability</p>
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="timezone">
              Timezone
            </label>
            <select
              id="timezone"
              className="field-input"
              value={data.timezone}
              onChange={(event) => setData((current) => (current ? { ...current, timezone: event.target.value } : current))}
            >
              {timezoneOptions.map((timezone) => (
                <option key={timezone} value={timezone}>
                  {timezone}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4">
            {data.availability
              .slice()
              .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
              .map((item) => (
                <div
                  key={item.dayOfWeek}
                  className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[180px_140px_1fr_1fr]"
                >
                  <div className="flex items-center">
                    <p className="text-base font-semibold text-foreground">{weekdays[item.dayOfWeek]}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={item.isAvailable}
                      onCheckedChange={(checked) => handleDayChange(item.dayOfWeek, "isAvailable", checked)}
                    />
                    <span className="text-sm font-medium text-slate-600">
                      {item.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <Input
                    type="time"
                    value={item.startTime}
                    disabled={!item.isAvailable}
                    aria-label={`${weekdays[item.dayOfWeek]} start time`}
                    onChange={(event) => handleDayChange(item.dayOfWeek, "startTime", event.target.value)}
                  />
                  <Input
                    type="time"
                    value={item.endTime}
                    disabled={!item.isAvailable}
                    aria-label={`${weekdays[item.dayOfWeek]} end time`}
                    onChange={(event) => handleDayChange(item.dayOfWeek, "endTime", event.target.value)}
                  />
                </div>
              ))}
          </div>

          <div className="flex justify-end">
            <Button onClick={() => void handleSave()} disabled={saving}>
              {saving ? "Saving..." : "Save Availability"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function mapAvailabilityResponse(response: AvailabilityResponse): AvailabilityFormState {
  return {
    timezone: response.user.timezone,
    availability: response.availability.map((item) => ({
      dayOfWeek: item.dayOfWeek,
      startTime: item.startTime,
      endTime: item.endTime,
      isAvailable: item.isAvailable
    }))
  };
}
