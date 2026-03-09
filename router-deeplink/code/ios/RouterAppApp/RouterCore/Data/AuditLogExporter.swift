import Foundation

#if canImport(React)
import React
#endif

@objc(AuditLogExporter)
final class AuditLogExporter: NSObject {
#if canImport(React)
  @objc static func requiresMainQueueSetup() -> Bool { false }
#endif

  @objc(exportLog:withResolver:withRejecter:)
  func exportLog(_ logText: String, resolve: @escaping (Bool) -> Void, reject: @escaping (String, String, Error?) -> Void) {
    do {
      let fileManager = FileManager.default
      let downloadsDir = fileManager.urls(for: .downloadsDirectory, in: .userDomainMask).first
      let documentsDir = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first
      let baseDir = downloadsDir ?? documentsDir!
      let fileURL = baseDir.appendingPathComponent("agent_audit_log.json")
      try logText.write(to: fileURL, atomically: true, encoding: .utf8)
      resolve(true)
    } catch {
      resolve(false)
    }
  }
}
