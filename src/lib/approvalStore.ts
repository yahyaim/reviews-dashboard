const KEY = "flexliving_approved_map_v1";

type MapType = Record<string | number, boolean>;

export function loadApprovalMap(): MapType {
try {
return JSON.parse(localStorage.getItem(KEY) || "{}");
} catch {
return {};
}
}

export function saveApprovalMap(map: MapType) {
localStorage.setItem(KEY, JSON.stringify(map));
}