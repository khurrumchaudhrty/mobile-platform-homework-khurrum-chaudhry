## App Summary
Router Deep Link demo app with three screens (Home, Explore, Profile) and an anchored Agent Flyout.

## What the Agent Can Do
- Navigate to Home, Explore, Profile.
- Apply Explore filters/sorts.
- Toggle Profile preferences (with confirmation).
- Export the agent audit log (with confirmation).
- Show a lightweight alert message.

## What the Agent Cannot Do
- Execute commands not in the allowlist.
- Change state without confirmation when policy requires it.
- Access private device data outside the app sandbox.

## Command Contract
Allowed commands:
- `navigate(screen)` → home | explore | profile
- `openFlyout()` / `closeFlyout()`
- `applyExploreFilter(filter, sort?)`
- `setPreference(key, value)`
- `showAlert(title, message)`
- `exportAuditLog(log)`

## Confirmation Policy
- `setPreference` → requires confirmation.
- `exportAuditLog` → requires confirmation.
- Others → no confirmation required.

## Golden Paths
1. User asks “What can you do?” → agent lists navigation/filter/Preference capabilities.
2. Agent proposes “Enable Notifications” → user confirms → toggle updates and log entry created.
3. Agent proposes “Export Audit Log” → user confirms → native module writes file.
