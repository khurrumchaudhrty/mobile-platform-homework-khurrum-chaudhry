import SwiftUI

#if canImport(React)
import React

struct RNHostView: UIViewRepresentable {
  func makeUIView(context: Context) -> UIView {
    let jsLocation = URL(string: "http://localhost:8081/index.bundle?platform=ios")!
    let bridge = RCTBridge(bundleURL: jsLocation, moduleProvider: nil, launchOptions: nil)
    let rootView = RCTRootView(bridge: bridge!, moduleName: "RouterApp", initialProperties: nil)
    return rootView
  }

  func updateUIView(_ uiView: UIView, context: Context) { }
}
#else
struct RNHostView: View {
  var body: some View {
    Text("React Native not linked")
      .font(.headline)
  }
}
#endif
