package com.example.router.presentation.deeplink

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import com.example.router.domain.model.RouteOutcome
import com.example.router.domain.model.RouteRequest
import com.example.router.domain.port.AuditLogger
import com.example.router.domain.port.Navigator
import com.example.router.domain.port.PreferenceStore
import com.example.router.domain.usecase.RouteUseCase
import com.example.router.domain.validation.RouteValidator

class DeepLinkActivity : Activity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val uri = intent?.data
    if (uri != null) {
      handleDeepLink(uri)
    } else {
      finish()
    }
  }

  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    val uri = intent.data
    if (uri != null) {
      handleDeepLink(uri)
    }
  }

  private fun handleDeepLink(uri: Uri) {
    val request = parse(uri)
    val outcome = buildRouter().handle(request)
    if (!outcome.navigated) {
      // Graceful failure: show a simple message and exit.
      // In production, route this to a toast or fallback UI.
      finish()
      return
    }
    finish()
  }

  private fun parse(uri: Uri): RouteRequest {
    val route = uri.lastPathSegment ?: "home"
    val params = mutableMapOf<String, String>()
    uri.queryParameterNames.forEach { key ->
      val value = uri.getQueryParameter(key)
      if (value != null) params[key] = value
    }
    return RouteRequest(
      route = route,
      params = params,
      source = "deeplink",
      timestamp = System.currentTimeMillis()
    )
  }

  private fun buildRouter(): RouteUseCase {
    return RouteUseCase(
      validator = RouteValidator(),
      navigator = object : Navigator {
        override fun navigate(route: String, params: Map<String, String>) {
          // Bridge into RN navigation or native nav controller.
        }
      },
      prefs = object : PreferenceStore {
        override fun set(key: String, value: Boolean): Boolean {
          // SharedPreferences integration goes here.
          return true
        }
      },
      logger = object : AuditLogger {
        override fun accept(request: RouteRequest): RouteOutcome {
          return RouteOutcome(status = "accepted", navigated = true, logged = true)
        }
        override fun reject(request: RouteRequest, reason: String): RouteOutcome {
          return RouteOutcome(status = "rejected", reason = reason, navigated = false, logged = true)
        }
      }
    )
  }
}
