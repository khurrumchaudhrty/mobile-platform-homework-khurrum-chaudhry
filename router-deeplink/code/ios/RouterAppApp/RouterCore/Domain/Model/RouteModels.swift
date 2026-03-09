import Foundation

struct RouteRequest {
  let route: String
  let params: [String: String]
  let source: String
  let timestamp: TimeInterval
}

struct RouteOutcome {
  let status: String
  let reason: String?
  let navigated: Bool
  let logged: Bool
}
