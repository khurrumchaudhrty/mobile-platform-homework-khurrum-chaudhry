import type { RouteOutcome, RouteRequest } from "../model/routeTypes";
import { validateRoute } from "../validation/routeValidator";

export type Navigator = {
  navigate: (route: string, params: Record<string, string>) => void;
};

export type PreferenceStore = {
  set: (key: string, value: boolean) => boolean;
};

export type AuditLogger = {
  accept: (request: RouteRequest) => RouteOutcome;
  reject: (request: RouteRequest, reason: string) => RouteOutcome;
};

export function handleRoute(
  request: RouteRequest,
  navigator: Navigator,
  prefs: PreferenceStore,
  logger: AuditLogger
): RouteOutcome {
  const result = validateRoute(request);
  if (!result.valid) {
    return logger.reject(request, result.reason ?? "invalid");
  }

  if (request.route === "profile") {
    const key = request.params.toggle;
    const value = request.params.value === "true";
    if (key) prefs.set(key, value);
  }

  navigator.navigate(request.route, request.params);
  return logger.accept(request);
}
