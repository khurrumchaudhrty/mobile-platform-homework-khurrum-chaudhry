import SwiftUI

@main
struct RouterAppApp: App {
  @StateObject private var coordinator = DeepLinkCoordinator()

  var body: some Scene {
    WindowGroup {
      ContentView(screen: coordinator.screen, lastOutcome: coordinator.lastOutcome)
        .onOpenURL { url in
          coordinator.handle(url: url)
        }
    }
  }
}

final class DeepLinkCoordinator: ObservableObject {
  @Published var lastOutcome: String = "No deep link yet"
  @Published var screen: Screen = .home
  private let handler = DeepLinkHandler()

  func handle(url: URL) {
    let outcome = handler.handle(url: url)
    if let host = url.host, let target = Screen(rawValue: host) {
      screen = target
    } else if url.pathComponents.count > 1, let target = Screen(rawValue: url.pathComponents[1]) {
      screen = target
    }
    if outcome.navigated {
      lastOutcome = "Accepted: \(outcome.status)"
    } else {
      let reason = outcome.reason ?? "unknown"
      lastOutcome = "Rejected: \(reason)"
    }
  }
}
