App summary
This is a small React Native demo with three screens (Home, Explore, Profile) and a persistent agent flyout.
The agent routes all UI actions through a Command Router that validates, confirms, and logs actions.

What the agent can do
- Navigate between Home, Explore, Profile.
- Apply Explore filters and sort.
- Update Profile preference (notifications).
- Show an in-app alert.
- Export the activity log to device storage.
- Open/close the flyout.

What the agent cannot do
- Directly mutate UI or state without the Command Router.
- Execute commands outside the allowlist.
- Change preferences without confirmation.

Command contract + confirmation policy
- navigate(screen): home | explore | profile
- openFlyout()
- closeFlyout()
- applyExploreFilter(filter, sort?)
- setPreference(key, value) -> requires confirmation
- showAlert(title, message)
- exportAuditLog() -> requires confirmation

Confirmation rules
- Required: setPreference, exportAuditLog
- Not required: navigate, openFlyout, closeFlyout, applyExploreFilter, showAlert

Golden paths
1) User: "Go to Explore"
   Agent: proposes navigate(explore) -> executes immediately.
2) User: "Enable notifications"
   Agent: proposes setPreference(notifications, true) -> waits for confirm.
3) User: "Export the audit log"
   Agent: proposes exportAuditLog() -> waits for confirm, writes file natively.
