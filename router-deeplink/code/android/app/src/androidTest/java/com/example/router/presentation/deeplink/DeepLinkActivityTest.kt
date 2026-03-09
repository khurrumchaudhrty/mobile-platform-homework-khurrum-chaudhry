package com.example.router.presentation.deeplink

import android.content.Intent
import android.net.Uri
import androidx.test.core.app.ActivityScenario
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class DeepLinkActivityTest {
  @Test
  fun launchesWithValidDeepLink() {
    val intent = Intent(Intent.ACTION_VIEW, Uri.parse("routerapp://explore?filter=active"))
    ActivityScenario.launch<DeepLinkActivity>(intent).use {
      // If activity launches without crash, the flow is considered successful.
    }
  }
}
