import SwiftUI

enum Screen: String {
  case home
  case explore
  case profile
}

struct ContentView: View {
  let screen: Screen
  let lastOutcome: String

  var body: some View {
    VStack(spacing: 16) {
      RNHostView()
      Text("Screen: \(screen.rawValue)")
        .font(.footnote)
        .foregroundColor(.secondary)
      Text(lastOutcome)
        .font(.footnote)
        .foregroundColor(.secondary)
    }
    .padding(0)
  }
}
