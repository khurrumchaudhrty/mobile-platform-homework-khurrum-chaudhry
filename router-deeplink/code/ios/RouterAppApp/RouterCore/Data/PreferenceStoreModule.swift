import Foundation

#if canImport(React)
import React
#endif

@objc(PreferenceStore)
final class PreferenceStoreModule: NSObject {
#if canImport(React)
  @objc static func requiresMainQueueSetup() -> Bool { false }
#endif

  @objc(getBool:withResolver:withRejecter:)
  func getBool(_ key: String, resolve: @escaping (Bool) -> Void, reject: @escaping (String, String, Error?) -> Void) {
    let value = UserDefaults.standard.bool(forKey: key)
    resolve(value)
  }

  @objc(setBool:withValue:withResolver:withRejecter:)
  func setBool(_ key: String, value: Bool, resolve: @escaping (Bool) -> Void, reject: @escaping (String, String, Error?) -> Void) {
    UserDefaults.standard.setValue(value, forKey: key)
    resolve(true)
  }
}
