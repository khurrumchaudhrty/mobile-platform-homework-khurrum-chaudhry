import Foundation

protocol PreferenceStore {
  func set(_ key: String, _ value: Bool) -> Bool
}
