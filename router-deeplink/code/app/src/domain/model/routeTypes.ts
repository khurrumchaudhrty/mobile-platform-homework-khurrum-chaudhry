export type RouteName = "home" | "explore" | "profile";

export type RouteRequest = {
  route: RouteName;
  params: Record<string, string>;
  source: "deeplink" | "internal";
  timestamp: number;
};

export type RouteOutcome = {
  status: "accepted" | "rejected";
  reason?: string;
  navigated: boolean;
  logged: boolean;
};
