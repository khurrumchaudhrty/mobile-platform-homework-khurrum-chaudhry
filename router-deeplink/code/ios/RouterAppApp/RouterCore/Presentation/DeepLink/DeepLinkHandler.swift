import Foundation

final class DeepLinkHandler {
  func handle(url: URL) -> RouteOutcome {
    let request = parse(url: url)
    let router = buildRouter()
    return router.handle(request)
  }

  private func parse(url: URL) -> RouteRequest {
    let route = url.pathComponents.last ?? "home"
    var params: [String: String] = [:]
    if let components = URLComponents(url: url, resolvingAgainstBaseURL: false) {
      components.queryItems?.forEach { item in
        if let value = item.value {
          params[item.name] = value
        }
      }
    }
    return RouteRequest(
      route: route,
      params: params,
      source: "deeplink",
      timestamp: Date().timeIntervalSince1970
    )
  }

  private func buildRouter() -> RouteUseCase {
    return RouteUseCase(
      validator: RouteValidator(),
      navigator: DefaultNavigator(),
      prefs: UserDefaultsStore(),
      logger: ConsoleAuditLogger()
    )
  }
}

final class DefaultNavigator: Navigator {
  func navigate(route: String, params: [String : String]) {
    // Bridge into RN navigation or native navigation.
  }
}

final class UserDefaultsStore: PreferenceStore {
  func set(_ key: String, _ value: Bool) -> Bool {
    UserDefaults.standard.set(value, forKey: key)
    return true
  }
}

final class ConsoleAuditLogger: AuditLogger {
  func accept(_ request: RouteRequest) -> RouteOutcome {
    return RouteOutcome(status: "accepted", reason: nil, navigated: true, logged: true)
  }

  func reject(_ request: RouteRequest, reason: String) -> RouteOutcome {
    return RouteOutcome(status: "rejected", reason: reason, navigated: false, logged: true)
  }
}
