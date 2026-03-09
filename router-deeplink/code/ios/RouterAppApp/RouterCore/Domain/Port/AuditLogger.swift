import Foundation

protocol AuditLogger {
  func accept(_ request: RouteRequest) -> RouteOutcome
  func reject(_ request: RouteRequest, reason: String) -> RouteOutcome
}
