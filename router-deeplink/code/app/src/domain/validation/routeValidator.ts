import type { RouteRequest } from "../model/routeTypes";

const allowedFilters = new Set(["active", "recent", "all"]);
const allowedSorts = new Set(["newest", "oldest"]);

export function validateRoute(request: RouteRequest): { valid: boolean; reason?: string } {
  if (!request.route) {
    return { valid: false, reason: "missing route" };
  }

  if (request.route === "explore") {
    const filter = request.params.filter;
    if (!filter || !allowedFilters.has(filter)) {
      return { valid: false, reason: "invalid filter" };
    }
    const sort = request.params.sort;
    if (sort && !allowedSorts.has(sort)) {
      return { valid: false, reason: "invalid sort" };
    }
  }

  if (request.route === "profile") {
    const key = request.params.toggle;
    const value = request.params.value;
    if (!key) return { valid: false, reason: "missing toggle key" };
    if (value !== "true" && value !== "false") {
      return { valid: false, reason: "invalid toggle value" };
    }
  }

  return { valid: true };
}
