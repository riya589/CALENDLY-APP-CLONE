import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isLoading,
  onConfirm,
  onClose
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-soft">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Please wait..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

