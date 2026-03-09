import Foundation

enum GroqConfig {
  static var apiKey: String {
    Bundle.main.object(forInfoDictionaryKey: "GroqApiKey") as? String ?? ""
  }
}
