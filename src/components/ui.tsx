import React from "react";

export const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-container px-4 md:px-6 ${className}`}>{children}</div>
);

export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <div className={`rounded-xl border border-brand-border bg-brand-surface shadow-card ${className}`}>{children}</div>
);

export const Button = ({
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) => {
  const base =
    "inline-flex items-center justify-center rounded-lg text-sm h-10 px-3 transition-colors border";
  const intent =
    props.variant === "primary"
      ? "bg-brand-accent text-white border-brand-accent hover:brightness-110"
      : "bg-white text-brand-text border-brand-border hover:border-[#cfc7b6]";
  const cls = `${base} ${intent} ${className}`;
  return <button {...props} className={cls} />;
};

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`h-11 w-full rounded-lg border border-brand-border bg-white px-3 text-sm placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-[#c9d7d6] focus:border-[#b6c9c7] ${props.className || ""}`}
  />
);

export const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className={`h-11 w-full appearance-none rounded-lg border border-brand-border bg-white px-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9d7d6] focus:border-[#b6c9c7] bg-[linear-gradient(45deg,transparent_50%,#9ca3af_50%),linear-gradient(135deg,#9ca3af_50%,transparent_50%)] bg-[length:6px_6px,6px_6px] bg-[position:calc(100%-18px)_calc(50%-3px),calc(100%-12px)_calc(50%-3px)] bg-no-repeat ${props.className || ""}`}
  />
);
