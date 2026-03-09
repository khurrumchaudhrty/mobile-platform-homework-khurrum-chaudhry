# Router Deep Link Demo

Small RN app with an anchored agent flyout and a validated command router.

## Setup
Quick commands (see `setup.md` for full details):
- **Android**
  - `cd code/android`
  - `./gradlew :app:installDebug`
- **iOS**
  - `cd code/ios/RouterAppApp`
  - `pod install`
  - Open `RouterAppApp.xcworkspace` and Run

## Architecture (TL;DR) (max 12 lines)
- `App.tsx` owns UI state + agent flyout state.
- `commandRouter.ts` enforces allowlist, validation, confirmation, logging.
- `activityLog.ts` stores an auditable command timeline.
- `routeParser.ts` parses deep links into structured routes.
- Native module writes audit log to device documents.
- Groq proxy runs locally (`server/server.js`).

## Key Decisions (max 10 bullets)
- Keep 3 screens + single flyout to focus on agent UX.
- Route all actions through a Command Router for auditability.
- Require confirmation for `setPreference` and `exportAuditLog` (only).
- Use a tiny Groq proxy to keep keys off-device.

## AI Disclosure
- Tools used: Cursor + ChatGPT.
- Used for: code search, quick syntax help, and wording drafts.
- Workflow: draft → verify in code → edit for app-specific detail.
- I wrote/decided: architecture, command rules, and UX behavior.

## Demo Script (5–8 bullets)
1. Open flyout, ask “What can you do?”
2. Tap “Go to Explore” suggestion.
3. Ask to enable notifications; confirm proposal.
4. Export audit log; confirm.
5. Open Profile to view activity log.
6. Trigger deep link to Profile.

## Next Steps
- Add a small E2E test around confirmation flow.
- Add retry + error banner for Groq failures.
- Add deep link examples in the web portal.

## Submission Checklist
- [ ] Repo named `mobile-platform-homework-<first-last>` (main branch)
- [ ] README includes Setup, Architecture TL;DR, Key Decisions, AI disclosure, Demo script, Next steps
- [ ] `agent/CONTEXT.md` included
- [ ] `artifacts/decisions.md` included (≤ 400 words)
- [ ] `artifacts/architecture.(png|md)` included
- [ ] Demo videos for iOS + Android included
- [ ] One meaningful test included + described

## One Meaningful Test
- `cd code/app && npm test` runs `tests/commandRouter.test.ts` to prove invalid commands are rejected and confirmation is enforced for `setPreference`.

## Confirmation Policy
- Requires confirmation: `setPreference`, `exportAuditLog`.
- No confirmation: `navigate`, `openFlyout`, `closeFlyout`, `applyExploreFilter`, `showAlert`.

## Native Module Export
- Android: `AuditLogExporterModule` writes `agent_audit_log.json` to Downloads.
- iOS: `AuditLogExporter` writes `agent_audit_log.json` to Downloads (Documents fallback).
- Triggered by the `exportAuditLog` command in the flyout.

## Web Portal (Stretch)
- Implemented in `web/` with three buttons that open deep links.
- If the app is not installed, the page shows a fallback alert.

## Structure
- `app/` — React Native app
- `android/` — Android host + native modules
- `ios/` — iOS host + native modules
- `server/` — Groq proxy
- `web/` — deep link launcher

## Documentation & Artifacts
- **Setup guide**: [`router-deeplink/setup.md`](router-deeplink/setup.md)
- **Technical design**: [`router-deeplink/TECHNICAL_DOCUMENT.md`](router-deeplink/TECHNICAL_DOCUMENT.md)
- **Agent context**: [`router-deeplink/agent/CONTEXT.md`](router-deeplink/agent/CONTEXT.md)
- **Architecture overview**:
  - Primary: [`router-deeplink/artifacts/architecture.md`](router-deeplink/artifacts/architecture.md)
  - Variant: [`router-deeplink/artifacts/artifacts/architecture.md`](router-deeplink/artifacts/artifacts/architecture.md)
- **Decision log**:
  - Primary: [`router-deeplink/artifacts/decisions.md`](router-deeplink/artifacts/decisions.md)
  - Variant: [`router-deeplink/artifacts/artifacts/decisions.md`](router-deeplink/artifacts/artifacts/decisions.md)
- **Cursor session log** (for reference): [`router-deeplink/agent/agent/cursor_mobile_router_deeplink.md`](router-deeplink/agent/agent/cursor_mobile_router_deeplink.md)
