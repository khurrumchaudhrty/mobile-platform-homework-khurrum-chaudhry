## Decisions (5 total)

1. **What:** Implemented a command allowlist and validation in the domain layer.  
   **Why:** Ensures the agent cannot execute arbitrary or unsafe commands.

2. **What:** Required confirmation for `setPreference` and `exportAuditLog`.  
   **Why:** These are state-changing or sensitive actions and need explicit user consent.

3. **What:** Implemented native filesystem export on both iOS and Android.  
   **Why:** The requirement forbids third‑party filesystem libraries in RN and expects native APIs.

4. **Rejected:** Pure JS file export using RN/Expo filesystem libs.  
   **Why:** It violates the “no pre-existing RN filesystem library” constraint.

5. **Rejected:** Keep preferences only in JS state.  
   **Why:** The Profile toggle must persist via SharedPreferences/UserDefaults.
