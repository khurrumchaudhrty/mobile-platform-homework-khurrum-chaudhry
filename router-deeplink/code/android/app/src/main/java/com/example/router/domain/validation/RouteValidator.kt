package com.example.router.domain.validation

import com.example.router.domain.model.RouteRequest

class RouteValidator {
  private val allowedRoutes = setOf("home", "explore", "profile")
  private val allowedFilters = setOf("active", "recent", "all")
  private val allowedSorts = setOf("newest", "oldest")

  fun validate(request: RouteRequest): ValidationResult {
    if (!allowedRoutes.contains(request.route)) {
      return ValidationResult(false, "unknown route")
    }

    if (request.route == "explore") {
      val filter = request.params["filter"]
      if (filter == null || !allowedFilters.contains(filter)) {
        return ValidationResult(false, "invalid filter")
      }
      val sort = request.params["sort"]
      if (sort != null && !allowedSorts.contains(sort)) {
        return ValidationResult(false, "invalid sort")
      }
    }

    if (request.route == "profile") {
      val key = request.params["toggle"]
      if (key.isNullOrBlank()) {
        return ValidationResult(false, "missing toggle key")
      }
      val value = request.params["value"]
      if (value.isNullOrBlank() || (value != "true" && value != "false")) {
        return ValidationResult(false, "invalid toggle value")
      }
    }

    return ValidationResult(true)
  }
}

data class ValidationResult(val valid: Boolean, val reason: String? = null)
