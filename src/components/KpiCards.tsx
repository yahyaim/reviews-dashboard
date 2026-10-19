import React from "react";
import { ChatBubbleLeftRightIcon, FaceSmileIcon, GlobeAltIcon, StarIcon } from "@heroicons/react/24/outline";
import { Card } from "./ui";

type Props = {
  total: number;
  avg: number | null;
  positivePct: number | null;
  onWebsite: number;
};

const Kpi = ({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: React.ReactNode;
  hint: string;
}) => (
  <Card className="flex items-start gap-3 p-4">
    <span className="rounded-lg bg-brand-accent/10 p-2 text-brand-accent">
      <Icon className="h-5 w-5" aria-hidden />
    </span>
    <div className="min-w-0">
      <p className="text-xs font-medium text-brand-muted">{label}</p>
      <p className="mt-0.5 text-2xl font-bold tabular-nums text-brand-text">{value}</p>
      <p className="mt-0.5 text-xs text-brand-muted">{hint}</p>
    </div>
  </Card>
);

export const KpiCards: React.FC<Props> = ({ total, avg, positivePct, onWebsite }) => (
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <Kpi icon={ChatBubbleLeftRightIcon} label="Reviews" value={total} hint="Matching current filters" />
    <Kpi icon={StarIcon} label="Average rating" value={avg == null ? "—" : `${avg.toFixed(1)}`} hint="Out of 10" />
    <Kpi
      icon={FaceSmileIcon}
      label="Positive"
      value={positivePct == null ? "—" : `${positivePct}%`}
      hint="Rated 9 or higher"
    />
    <Kpi icon={GlobeAltIcon} label="On website" value={onWebsite} hint={`of ${total} in this view`} />
  </div>
);
