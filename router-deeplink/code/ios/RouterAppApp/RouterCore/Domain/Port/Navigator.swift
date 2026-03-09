import Foundation

protocol Navigator {
  func navigate(route: String, params: [String: String])
}
