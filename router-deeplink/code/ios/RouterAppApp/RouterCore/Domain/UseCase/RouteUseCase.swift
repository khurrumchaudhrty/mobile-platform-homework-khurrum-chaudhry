import Foundation

final class RouteUseCase {
  private let validator: RouteValidator
  private let navigator: Navigator
  private let prefs: PreferenceStore
  private let logger: AuditLogger

  init(validator: RouteValidator, navigator: Navigator, prefs: PreferenceStore, logger: AuditLogger) {
    self.validator = validator
    self.navigator = navigator
    self.prefs = prefs
    self.logger = logger
  }

  func handle(_ request: RouteRequest) -> RouteOutcome {
    let result = validator.validate(request)
    if !result.valid {
      return logger.reject(request, reason: result.reason ?? "invalid")
    }

    if request.route == "profile" {
      let key = request.params["toggle"] ?? ""
      let value = (request.params["value"] as NSString?)?.boolValue ?? false
      if !key.isEmpty {
        _ = prefs.set(key, value)
      }
    }

    navigator.navigate(route: request.route, params: request.params)
    return logger.accept(request)
  }
}
