Architecture (text diagram)

UI (React Native)
  App.tsx
    - screen state (home/explore/profile)
    - messages state (user/agent)
    - renders AgentFlyout + Screens
      |
      v
AgentFlyout.tsx
  - sends user text to Groq proxy
  - dispatches structured commands
      |
      v
Command Router (domain/commands/commandRouter.ts)
  - allowlist + validation
  - confirmation gate
  - activity log
      |
      v
Native Module (app/src/native/nativeModules.ts + Android/iOS)
  - export audit log to documents dir
  - invoked via exportAuditLog command

Deep links
  Android intent -> Linking -> routeParser.ts -> navigate(screen)

Groq proxy
  server/server.js -> Groq API -> reply back to flyout

Web launcher (optional)
  web/src/main.js -> routerapp:// deep links
