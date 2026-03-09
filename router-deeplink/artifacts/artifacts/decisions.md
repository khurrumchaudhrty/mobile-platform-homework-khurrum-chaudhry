Decisions (5 total)

1) What: Centralized UI control through a Command Router allowlist.
   Why: It enforces validation, confirmation, and audit logging in one place.

2) What: Require confirmation for setPreference and exportAuditLog.
   Why: Both change user state or write files and should be explicit.

3) What: Keep three screens minimal with placeholder content.
   Why: The core product is the agent workflow, not content depth.

4) Rejected: Let the agent directly call UI setters.
   Why: It bypasses auditability and makes unsafe actions too easy.

5) Rejected: Use a third-party FS library for audit export.
   Why: The prompt requires a custom native implementation.
