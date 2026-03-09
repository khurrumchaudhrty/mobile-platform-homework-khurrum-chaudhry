Setup guide

Prereqs
- Node 18+
- Android Studio (emulator or device)
- Xcode (for iOS)
- CocoaPods (for iOS)

1) Install RN deps + start Metro
```
cd app
npm install
npm start
```

2) Android (emulator)
```
cd android
./gradlew :app:installDebug
```
Or run from Android Studio.

If using the Groq proxy on Android emulator, run:
```
adb reverse tcp:8787 tcp:8787
```

3) iOS
```
cd ios/RouterAppApp
pod install
```
Open `RouterAppApp.xcworkspace` and Run.

4) Groq proxy
```
cd server
GROQ_API_KEY=YOUR_KEY node server.js
```
The app expects:
- Android emulator: `http://127.0.0.1:8787/groq` (requires `adb reverse`)
- iOS: `http://localhost:8787/groq`

If running on a physical Android device, change the proxy URL to your LAN IP.

5) Web deep link launcher (optional)
```
cd web
npm install
npm run dev
```

Deep links
- `routerapp://home`
- `routerapp://explore`
- `routerapp://profile?toggle=notifications&value=true`

Tests
```
cd app
npm test
```

Native export
- Run "Export Audit Log" from the flyout.
- File written: `agent_audit_log.json` in Downloads (Android) or Downloads/Documents (iOS fallback).
