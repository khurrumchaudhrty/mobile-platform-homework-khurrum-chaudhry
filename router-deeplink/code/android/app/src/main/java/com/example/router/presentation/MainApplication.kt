package com.example.router.presentation

import android.app.Application
import com.example.router.BuildConfig
import com.example.router.nativebridge.NativeBridgePackage
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {
  private val mReactNativeHost: ReactNativeHost = object : ReactNativeHost(this) {
    override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

    override fun getPackages(): List<ReactPackage> {
      return listOf(
        MainReactPackage(),
        NativeBridgePackage()
      )
    }

    override fun getJSMainModuleName(): String = "index"

    override fun getJSBundleFile(): String? {
      return if (BuildConfig.DEBUG) {
        "http://10.0.2.2:8081/index.bundle?platform=android&dev=true&minify=false"
      } else {
        "assets://index.android.bundle"
      }
    }
  }

  override val reactNativeHost: ReactNativeHost
    get() = mReactNativeHost

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
  }
}
