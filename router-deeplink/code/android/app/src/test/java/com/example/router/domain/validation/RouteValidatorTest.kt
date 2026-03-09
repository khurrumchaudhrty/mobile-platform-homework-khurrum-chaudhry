package com.example.router.domain.validation

import com.example.router.domain.model.RouteRequest
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class RouteValidatorTest {
  private val validator = RouteValidator()

  @Test
  fun rejectsUnknownRoute() {
    val request = RouteRequest("unknown", emptyMap(), "test", 0)
    val result = validator.validate(request)
    assertFalse(result.valid)
  }

  @Test
  fun acceptsExploreWithValidFilter() {
    val request = RouteRequest("explore", mapOf("filter" to "active"), "test", 0)
    val result = validator.validate(request)
    assertTrue(result.valid)
  }

  @Test
  fun rejectsProfileMissingToggle() {
    val request = RouteRequest("profile", mapOf("value" to "true"), "test", 0)
    val result = validator.validate(request)
    assertFalse(result.valid)
  }
}
