package com.example.router.domain.port

interface PreferenceStore {
  fun set(key: String, value: Boolean): Boolean
}
