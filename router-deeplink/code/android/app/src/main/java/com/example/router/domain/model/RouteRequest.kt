package com.example.router.domain.model

data class RouteRequest(
  val route: String,
  val params: Map<String, String>,
  val source: String,
  val timestamp: Long
)

data class RouteOutcome(
  val status: String,
  val reason: String? = null,
  val navigated: Boolean = false,
  val logged: Boolean = false
)
