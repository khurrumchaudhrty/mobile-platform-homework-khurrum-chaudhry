package com.example.router.nativebridge

import android.content.Context
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class PreferenceStoreModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "PreferenceStore"

  private val prefs = reactApplicationContext.getSharedPreferences("router_prefs", Context.MODE_PRIVATE)

  @ReactMethod
  fun getBool(key: String, promise: Promise) {
    promise.resolve(prefs.getBoolean(key, false))
  }

  @ReactMethod
  fun setBool(key: String, value: Boolean, promise: Promise) {
    prefs.edit().putBoolean(key, value).apply()
    promise.resolve(true)
  }
}
