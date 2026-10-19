import { useCallback, useSyncExternalStore } from "react";
import type { Review } from "../types/review";

/**
 * Which reviews the manager has approved for the public website.
 *
 * Persisted to localStorage so approvals survive reloads and are shared with the
 * Testimonials page (and other tabs, via the `storage` event). Reviews are hidden
 * until explicitly approved. Swap this for an API call once there is a backend
 * to store approvals.
 */
const KEY = "reviews-dashboard:approved:v1";

type ApprovalMap = Record<string, true>;
type Id = Review["id"];

function read(): ApprovalMap {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    return parsed && typeof parsed === "object" ? (parsed as ApprovalMap) : {};
  } catch {
    return {};
  }
}

let snapshot: ApprovalMap = read();
const listeners = new Set<() => void>();

function write(next: ApprovalMap) {
  snapshot = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage blocked or full: keep working in memory for this session.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    snapshot = read();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useApprovals() {
  const approvals = useSyncExternalStore(subscribe, () => snapshot);

  const isApproved = useCallback((id: Id) => approvals[id] === true, [approvals]);

  const setApproved = useCallback((ids: Id[], value: boolean) => {
    const next = { ...snapshot };
    for (const id of ids) {
      if (value) next[id] = true;
      else delete next[id];
    }
    write(next);
  }, []);

  return { isApproved, setApproved };
}
