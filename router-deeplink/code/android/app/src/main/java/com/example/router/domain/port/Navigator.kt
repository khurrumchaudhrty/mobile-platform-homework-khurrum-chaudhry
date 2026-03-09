package com.example.router.domain.port

interface Navigator {
  fun navigate(route: String, params: Map<String, String>)
}
