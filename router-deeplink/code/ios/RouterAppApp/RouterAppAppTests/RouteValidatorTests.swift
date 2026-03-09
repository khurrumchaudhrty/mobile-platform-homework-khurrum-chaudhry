import XCTest

@testable import RouterAppApp

final class RouteValidatorTests: XCTestCase {
  func testRejectsUnknownRoute() {
    let validator = RouteValidator()
    let request = RouteRequest(route: "unknown", params: [:], source: "test", timestamp: 0)
    let result = validator.validate(request)
    XCTAssertFalse(result.valid)
  }

  func testAcceptsExploreWithValidFilter() {
    let validator = RouteValidator()
    let request = RouteRequest(route: "explore", params: ["filter": "active"], source: "test", timestamp: 0)
    let result = validator.validate(request)
    XCTAssertTrue(result.valid)
  }
}
