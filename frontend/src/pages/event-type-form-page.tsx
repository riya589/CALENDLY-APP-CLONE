import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { createEventType, getEventTypeById, updateEventType } from "@/api/event-types";
import { ErrorState } from "@/components/common/error-state";
import { FormField } from "@/components/common/form-field";
import { LoadingState } from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { eventTypeFormSchema, type EventTypeFormValues } from "@/lib/schemas";
import { parseApiError, slugify } from "@/utils/format";

type EventTypeFormPageProps = {
  mode: "create" | "edit";
};

export function EventTypeFormPage({ mode }: EventTypeFormPageProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(mode === "edit");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const slugEditedManually = useRef(false);

  const form = useForm<EventTypeFormValues>({
    resolver: zodResolver(eventTypeFormSchema),
    defaultValues: {
      name: "",
      duration: 30,
      slug: "",
      description: "",
      color: "#006bff",
      isActive: true
    }
  });

  const nameValue = form.watch("name");

  useEffect(() => {
    if (!slugEditedManually.current) {
      form.setValue("slug", slugify(nameValue), { shouldValidate: true });
    }
  }, [form, nameValue]);

  useEffect(() => {
    if (mode !== "edit" || !id) {
      return;
    }

    const loadEventType = async () => {
      try {
        setLoading(true);
        setError("");
        const eventType = await getEventTypeById(id);
        form.reset({
          name: eventType.name,
          duration: eventType.duration,
          slug: eventType.slug,
          description: eventType.description ?? "",
          color: eventType.color ?? "#006bff",
          isActive: eventType.isActive
        });
        slugEditedManually.current = true;
      } catch (err) {
        setError(parseApiError(err, "Failed to load event type"));
      } finally {
        setLoading(false);
      }
    };

    void loadEventType();
  }, [form, id, mode]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setSubmitting(true);
      const payload = {
        ...values,
        description: values.description || "",
        color: values.color || ""
      };

      if (mode === "create") {
        await createEventType(payload);
        toast.success("Event type created successfully");
      } else if (id) {
        await updateEventType(id, payload);
        toast.success("Event type updated successfully");
      }

      navigate("/dashboard/event-types");
    } catch (err) {
      toast.error(parseApiError(err, "Failed to save event type"));
    } finally {
      setSubmitting(false);
    }
  });

  if (loading) {
    return <LoadingState message="Loading event type..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Button variant="outline" asChild>
          <Link to="/dashboard/event-types">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {mode === "create" ? "Create Event Type" : "Edit Event Type"}
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Define a polished booking experience with a duration, shareable slug, and visual identity.
        </p>
      </div>

      <Card className="p-6 sm:p-8">
        <form className="grid gap-6" onSubmit={onSubmit}>
          <div className="grid gap-6 lg:grid-cols-2">
            <FormField label="Name" htmlFor="name" error={form.formState.errors.name?.message}>
              <Input id="name" placeholder="30 Minute Meeting" {...form.register("name")} />
            </FormField>

            <FormField
              label="Duration (minutes)"
              htmlFor="duration"
              error={form.formState.errors.duration?.message}
            >
              <Input id="duration" type="number" min={1} {...form.register("duration")} />
            </FormField>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <FormField label="Slug" htmlFor="slug" error={form.formState.errors.slug?.message}>
              <Input
                id="slug"
                placeholder="30-minute-meeting"
                {...form.register("slug")}
                onChange={(event) => {
                  slugEditedManually.current = true;
                  form.setValue("slug", slugify(event.target.value), { shouldValidate: true });
                }}
              />
            </FormField>

            <FormField label="Color" htmlFor="color" error={form.formState.errors.color?.message}>
              <div className="flex items-center gap-3">
                <Input id="color" placeholder="#006bff" {...form.register("color")} />
                <input
                  type="color"
                  value={form.watch("color") || "#006bff"}
                  onChange={(event) => form.setValue("color", event.target.value, { shouldValidate: true })}
                  className="h-11 w-16 rounded-xl border border-slate-200 bg-white p-1"
                />
              </div>
            </FormField>
          </div>

          <FormField
            label="Description"
            htmlFor="description"
            error={form.formState.errors.description?.message}
          >
            <Textarea
              id="description"
              placeholder="Add a short description for what this meeting is used for."
              {...form.register("description")}
            />
          </FormField>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <div>
              <p className="font-semibold text-foreground">Event type active</p>
              <p className="text-sm text-slate-600">Inactive events will not be bookable on the public page.</p>
            </div>
            <Switch
              checked={form.watch("isActive")}
              onCheckedChange={(checked) => form.setValue("isActive", checked)}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" asChild>
              <Link to="/dashboard/event-types">Cancel</Link>
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : mode === "create" ? "Create Event Type" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
