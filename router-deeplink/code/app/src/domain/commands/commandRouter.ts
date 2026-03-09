import { createActivityLogger } from "./activityLog";

type Command =
  | { name: "navigate"; screen: "home" | "explore" | "profile" }
  | { name: "openFlyout" }
  | { name: "closeFlyout" }
  | { name: "applyExploreFilter"; filter: string; sort?: string }
  | { name: "setPreference"; key: "notifications"; value: boolean }
  | { name: "showAlert"; title: string; message: string }
  | { name: "exportAuditLog" };

type RouterDependencies = {
  navigate: (route: "home" | "explore" | "profile") => void;
  openFlyout: () => void;
  closeFlyout: () => void;
  applyExploreFilter: (filter: string, sort?: string) => void;
  setPreference: (key: "notifications", value: boolean) => void;
  showAlert: (title: string, message: string) => void;
  exportAuditLog: (logText: string) => Promise<boolean>;
  getAuditLogText: () => string;
  logger: ReturnType<typeof createActivityLogger>;
};

export type CommandRouter = {
  dispatch: (command: Command) => Promise<{ requiresConfirmation: boolean }>;
  confirm: (command: Command) => Promise<void>;
  ask: (text: string) => void;
};

const allowlist = new Set([
  "navigate",
  "openFlyout",
  "closeFlyout",
  "applyExploreFilter",
  "setPreference",
  "showAlert",
  "exportAuditLog"
]);

export function createCommandRouter(deps: RouterDependencies): CommandRouter {
  const requiresConfirmation = (command: Command) =>
    command.name === "setPreference" || command.name === "exportAuditLog";

  const validate = (command: Command): { ok: boolean; reason?: string } => {
    if (!allowlist.has(command.name)) return { ok: false, reason: "not-allowed" };
    if (command.name === "applyExploreFilter") {
      if (!command.filter) return { ok: false, reason: "missing-filter" };
    }
    return { ok: true };
  };

  const execute = async (command: Command) => {
    switch (command.name) {
      case "openFlyout":
        deps.openFlyout();
        break;
      case "closeFlyout":
        deps.closeFlyout();
        break;
      case "navigate":
        deps.navigate(command.screen);
        break;
      case "applyExploreFilter":
        deps.applyExploreFilter(command.filter, command.sort);
        break;
      case "setPreference":
        deps.setPreference(command.key, command.value);
        break;
      case "showAlert":
        deps.showAlert(command.title, command.message);
        break;
      case "exportAuditLog":
        await deps.exportAuditLog(deps.getAuditLogText());
        break;
      default:
        break;
    }
  };

  return {
    async dispatch(command: Command) {
      const valid = validate(command);
      if (!valid.ok) {
        deps.logger.logRejected(command.name, valid.reason || "invalid");
        return { requiresConfirmation: false };
      }
      if (requiresConfirmation(command)) {
        deps.logger.logInfo(`PROPOSED: ${command.name}`);
        return { requiresConfirmation: true };
      }
      await execute(command);
      deps.logger.logAccepted(command.name);
      return { requiresConfirmation: false };
    },
    async confirm(command: Command) {
      await execute(command);
      deps.logger.logAccepted(command.name);
    },
    ask(text: string) {
      const normalized = text.toLowerCase();
      if (normalized.includes("what can you do")) {
        deps.logger.logInfo("AGENT: I can navigate, filter Explore, and update Profile preferences.");
      } else if (normalized.includes("where is")) {
        deps.logger.logInfo("AGENT: Home, Explore, and Profile are available at the top of the app.");
      } else if (normalized.includes("filter")) {
        deps.logger.logInfo("AGENT: Explore supports filters: active, recent, all. Sort: newest, oldest.");
      } else {
        deps.logger.logInfo(`AGENT: You said "${text}"`);
      }
    }
  };
}
