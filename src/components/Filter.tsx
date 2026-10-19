import React, { useState } from "react";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Button, Card, Field, Input, Select } from "./ui";
import { cn } from "../lib/cn";
import {
  CHANNEL_OPTIONS,
  RATING_OPTIONS,
  VISIBILITY_OPTIONS,
  type Filters,
} from "../lib/filterReviews";
import { CATEGORIES, categoryLabel, formatDate, type CategoryKey } from "../lib/reviews";

type Props = {
  filters: Filters;
  update: (patch: Partial<Filters>) => void;
  reset: () => void;
  listingOptions: string[];
};

export const Filter: React.FC<Props> = ({ filters: f, update, reset, listingOptions }) => {
  const label = (opts: { value: string; label: string }[], v: string) => opts.find((o) => o.value === v)?.label ?? v;

  const chips = [
    f.query && { label: `“${f.query}”`, clear: { query: "" } },
    f.channel !== "All" && { label: f.channel, clear: { channel: "All" } },
    f.listing !== "All" && { label: f.listing, clear: { listing: "All" } },
    // Category and rating band read as one condition ("Cleanliness below 8").
    (f.category !== "All" || f.rating !== "All") && {
      label: [
        f.category === "All" ? "Rating" : categoryLabel(f.category),
        f.rating === "All" ? "scored" : label(RATING_OPTIONS, f.rating).split(" · ")[0].toLowerCase(),
      ].join(" "),
      clear: { category: "All", rating: "All" },
    },
    f.from && { label: `From ${formatDate(f.from)}`, clear: { from: "" } },
    f.to && { label: `To ${formatDate(f.to)}`, clear: { to: "" } },
    f.visibility !== "All" && { label: label(VISIBILITY_OPTIONS, f.visibility), clear: { visibility: "All" } },
  ].filter(Boolean) as { label: string; clear: Partial<Filters> }[];

  // On phones everything but search sits behind a toggle; from `sm` up it's always shown.
  const [showMore, setShowMore] = useState(false);
  const moreCount = chips.length - (f.query ? 1 : 0);

  return (
    <Card>
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-12">
        <Field label="Search" htmlFor="f-query" className="sm:col-span-2 lg:col-span-4">
          <div className="relative">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
            <Input
              id="f-query"
              type="search"
              placeholder="Guest, listing or review text"
              value={f.query}
              onChange={(e) => update({ query: e.target.value })}
              className="pl-9"
            />
          </div>
        </Field>

        <Button
          className="sm:hidden"
          onClick={() => setShowMore((v) => !v)}
          aria-expanded={showMore}
          aria-controls="more-filters"
        >
          <AdjustmentsHorizontalIcon className="h-4 w-4" aria-hidden />
          {showMore ? "Fewer filters" : "More filters"}
          {moreCount > 0 && <span className="rounded-full bg-brand-accent px-1.5 text-xs text-white">{moreCount}</span>}
        </Button>

        <div id="more-filters" className={cn("gap-3 sm:contents", showMore ? "grid" : "hidden")}>
          <Field label="Listing" htmlFor="f-listing" className="lg:col-span-3">
            <Select id="f-listing" value={f.listing} onChange={(e) => update({ listing: e.target.value })}>
              <option value="All">All listings ({listingOptions.length})</option>
              {listingOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Channel" htmlFor="f-channel" className="lg:col-span-2">
            <Select
              id="f-channel"
              value={f.channel}
              onChange={(e) => update({ channel: e.target.value as Filters["channel"] })}
            >
              {CHANNEL_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Category" htmlFor="f-category" className="lg:col-span-3">
            <Select
              id="f-category"
              value={f.category}
              onChange={(e) => update({ category: e.target.value as "All" | CategoryKey })}
            >
              <option value="All">Overall rating</option>
              {CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            label={f.category === "All" ? "Rating" : `${categoryLabel(f.category)} score`}
            htmlFor="f-rating"
            className="lg:col-span-4"
          >
            <Select id="f-rating" value={f.rating} onChange={(e) => update({ rating: e.target.value as Filters["rating"] })}>
              {RATING_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="From" htmlFor="f-from" className="lg:col-span-2">
            <Input id="f-from" type="date" value={f.from} max={f.to || undefined} onChange={(e) => update({ from: e.target.value })} />
          </Field>

          <Field label="To" htmlFor="f-to" className="lg:col-span-2">
            <Input id="f-to" type="date" value={f.to} min={f.from || undefined} onChange={(e) => update({ to: e.target.value })} />
          </Field>

          <Field label="Website" htmlFor="f-visibility" className="lg:col-span-4">
            <Select
              id="f-visibility"
              value={f.visibility}
              onChange={(e) => update({ visibility: e.target.value as Filters["visibility"] })}
            >
              {VISIBILITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.value === "All" ? "Shown and hidden" : o.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-t border-brand-border/60 px-4 py-3">
          <span className="text-xs font-medium text-brand-muted">Active filters:</span>
          {chips.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => update(c.clear)}
              className="inline-flex max-w-full items-center gap-1 rounded-full border border-brand-accent/20 bg-brand-accent/5 py-1 pl-3 pr-2 text-xs text-brand-accent hover:bg-brand-accent/10"
              aria-label={`Remove filter ${c.label}`}
            >
              <span className="truncate">{c.label}</span>
              <XMarkIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </button>
          ))}
          <button
            type="button"
            onClick={reset}
            className="ml-auto text-xs font-medium text-brand-accent underline-offset-2 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}
    </Card>
  );
};

