package com.example.router.domain.usecase

import com.example.router.domain.model.RouteOutcome
import com.example.router.domain.model.RouteRequest
import com.example.router.domain.port.AuditLogger
import com.example.router.domain.port.Navigator
import com.example.router.domain.port.PreferenceStore
import com.example.router.domain.validation.RouteValidator

class RouteUseCase(
  private val validator: RouteValidator,
  private val navigator: Navigator,
  private val prefs: PreferenceStore,
  private val logger: AuditLogger
) {
  fun handle(request: RouteRequest): RouteOutcome {
    val result = validator.validate(request)
    if (!result.valid) {
      return logger.reject(request, result.reason ?: "invalid")
    }

    if (request.route == "profile") {
      val key = request.params["toggle"]
      val value = request.params["value"]?.toBoolean() ?: false
      if (!key.isNullOrBlank()) {
        prefs.set(key, value)
      }
    }

    navigator.navigate(request.route, request.params)
    return logger.accept(request)
  }
}
