package com.example.router.domain.port

import com.example.router.domain.model.RouteOutcome
import com.example.router.domain.model.RouteRequest

interface AuditLogger {
  fun accept(request: RouteRequest): RouteOutcome
  fun reject(request: RouteRequest, reason: String): RouteOutcome
}
