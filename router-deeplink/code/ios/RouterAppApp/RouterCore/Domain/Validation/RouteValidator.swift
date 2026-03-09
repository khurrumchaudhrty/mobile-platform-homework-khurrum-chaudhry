import Foundation

final class RouteValidator {
  private let allowedRoutes: Set<String> = ["home", "explore", "profile"]
  private let allowedFilters: Set<String> = ["active", "recent", "all"]
  private let allowedSorts: Set<String> = ["newest", "oldest"]

  func validate(_ request: RouteRequest) -> ValidationResult {
    if !allowedRoutes.contains(request.route) {
      return ValidationResult(valid: false, reason: "unknown route")
    }

    if request.route == "explore" {
      guard let filter = request.params["filter"], allowedFilters.contains(filter) else {
        return ValidationResult(valid: false, reason: "invalid filter")
      }
      if let sort = request.params["sort"], !allowedSorts.contains(sort) {
        return ValidationResult(valid: false, reason: "invalid sort")
      }
    }

    if request.route == "profile" {
      let key = request.params["toggle"]
      if key == nil || key == "" {
        return ValidationResult(valid: false, reason: "missing toggle key")
      }
      let value = request.params["value"]
      if value != "true" && value != "false" {
        return ValidationResult(valid: false, reason: "invalid toggle value")
      }
    }

    return ValidationResult(valid: true, reason: nil)
  }
}

struct ValidationResult {
  let valid: Bool
  let reason: String?
}
