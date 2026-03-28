import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
      {children}
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  );
}
