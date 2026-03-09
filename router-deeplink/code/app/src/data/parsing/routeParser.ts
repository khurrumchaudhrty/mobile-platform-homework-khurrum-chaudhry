import type { RouteRequest } from "../../domain/model/routeTypes";

export function parseUrl(url: string): RouteRequest {
  const { hostRoute, primaryPathSegment, params } = safeParseUrl(url);
  const candidates = [hostRoute, primaryPathSegment, "home"].filter(Boolean);
  const route = (candidates.find((candidate) =>
    candidate === "home" || candidate === "explore" || candidate === "profile"
  ) || "home") as RouteRequest["route"];
  return {
    route,
    params,
    source: "deeplink",
    timestamp: Date.now(),
  };
}

function safeParseUrl(url: string) {
  try {
    const parsed = new URL(url);
    const pathRoute = parsed.pathname.replace(/^\/+/, "");
    const hostRoute = parsed.hostname || parsed.host;
    const primaryPathSegment = pathRoute.split("/")[0];
    const params: Record<string, string> = {};
    parsed.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return { hostRoute, primaryPathSegment, params };
  } catch {
    // React Native URL polyfill may not implement pathname/URL fully.
    // Fall back to a simple parser for scheme://host/path?query
    const [beforeQuery, query = ""] = url.split("?");
    const withoutScheme = beforeQuery.replace(/^[a-z][a-z0-9+.-]*:\/\//i, "");
    const [hostPart, ...pathParts] = withoutScheme.split("/");
    const primaryPathSegment = pathParts[0] || "";
    const params: Record<string, string> = {};
    query.split("&").filter(Boolean).forEach((pair) => {
      const [key, value = ""] = pair.split("=");
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return { hostRoute: hostPart, primaryPathSegment, params };
  }
}
