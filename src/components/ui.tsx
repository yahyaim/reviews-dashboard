import React from "react";
import { Switch } from "@headlessui/react";
import { scoreTone } from "../lib/reviews";
import { cn as cx } from "../lib/cn";

export const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <div className={cx("mx-auto w-full max-w-container px-4 md:px-6", className)}>{children}</div>
);

export const Card: React.FC<React.PropsWithChildren<{ className?: string; id?: string }>> = ({ className = "", id, children }) => (
  <section id={id} className={cx("rounded-xl border border-brand-border bg-brand-surface shadow-card", className)}>
    {children}
  </section>
);

export const CardHeader: React.FC<React.PropsWithChildren<{ title: string; subtitle?: React.ReactNode }>> = ({
  title,
  subtitle,
  children,
}) => (
  <header className="flex flex-col gap-3 border-b border-brand-border/70 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
    <div className="min-w-0">
      <h2 className="text-base font-semibold text-brand-text">{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm text-brand-muted">{subtitle}</p>}
    </div>
    {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
  </header>
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "secondary", size = "md", type = "button", ...props }, ref) => {
    const intent = {
      primary: "bg-brand-accent text-white border-brand-accent hover:bg-brand-accent/90",
      secondary: "bg-white text-brand-text border-brand-border hover:bg-brand-bg/60",
      ghost: "bg-transparent text-brand-accent border-transparent hover:bg-brand-accent/5",
    }[variant];
    return (
      <button
        ref={ref}
        type={type}
        {...props}
        className={cx(
          "inline-flex items-center justify-center gap-1.5 rounded-lg border font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40",
          "disabled:cursor-not-allowed disabled:opacity-50",
          size === "sm" ? "h-8 px-2.5 text-xs" : "h-10 px-3.5 text-sm",
          intent,
          className
        )}
      />
    );
  }
);
Button.displayName = "Button";

const fieldBase =
  "h-10 w-full rounded-lg border-brand-border bg-white text-sm text-brand-text shadow-none placeholder:text-brand-muted focus:border-brand-accent/50 focus:ring-2 focus:ring-brand-accent/20";

export const Input = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={cx(fieldBase, className)} />
);

export const Select = ({ className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className={cx(fieldBase, "pr-8", className)} />
);

export const Field: React.FC<React.PropsWithChildren<{ label: string; htmlFor: string; className?: string }>> = ({
  label,
  htmlFor,
  className,
  children,
}) => (
  <div className={className}>
    <label htmlFor={htmlFor} className="mb-1 block text-xs font-medium text-brand-muted">
      {label}
    </label>
    {children}
  </div>
);

export const Badge: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <span className={cx("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", className)}>
    {children}
  </span>
);

/** Colour-coded 0–10 score. Pass `average` to always show one decimal. */
export const ScoreBadge = ({
  value,
  average = false,
  className = "",
}: {
  value: number | null | undefined;
  average?: boolean;
  className?: string;
}) => (
  <span
    className={cx(
      "inline-flex min-w-[2.75rem] items-center justify-center rounded-md px-1.5 py-0.5 text-sm font-semibold tabular-nums ring-1 ring-inset ring-transparent",
      scoreTone(value),
      className
    )}
  >
    {value == null ? "—" : !average && Number.isInteger(value) ? value : value.toFixed(1)}
  </span>
);

export const Toggle = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) => (
  <Switch
    checked={checked}
    onChange={onChange}
    aria-label={label}
    className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-2 data-[checked]:bg-brand-accent"
  >
    <span className="pointer-events-none inline-block h-5 w-5 translate-x-0.5 translate-y-0.5 rounded-full bg-white shadow transition-transform group-data-[checked]:translate-x-[1.375rem]" />
  </Switch>
);

export const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={cx("animate-pulse rounded-md bg-brand-border/50", className)} />
);

export const Pagination = ({
  page,
  totalPages,
  total,
  pageSize,
  onChange,
  noun,
}: {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onChange: (p: number) => void;
  noun: string;
}) => {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  return (
    <nav aria-label={`${noun} pagination`} className="flex items-center justify-between gap-3 px-4 py-3">
      <p className="text-sm text-brand-muted">
        {total === 0 ? `No ${noun}` : `${start}–${end} of ${total} ${noun}`}
      </p>
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
          ‹ Prev
        </Button>
        <span className="text-sm tabular-nums text-brand-muted">
          {page} / {totalPages}
        </span>
        <Button size="sm" onClick={() => onChange(page + 1)} disabled={page >= totalPages} aria-label="Next page">
          Next ›
        </Button>
      </div>
    </nav>
  );
};
