import * as assert from "node:assert/strict";
import { createCommandRouter } from "../src/domain/commands/commandRouter";
import { createActivityLogger } from "../src/domain/commands/activityLog";

const log: string[] = [];
const logger = createActivityLogger({
  append: (entry) => log.push(entry.message),
});

const router = createCommandRouter({
  navigate: () => {},
  openFlyout: () => {},
  closeFlyout: () => {},
  applyExploreFilter: () => {},
  setPreference: () => {},
  showAlert: () => {},
  exportAuditLog: async () => true,
  getAuditLogText: () => "audit",
  logger,
});

async function run() {
  const invalid = await router.dispatch({ name: "applyExploreFilter", filter: "" });
  assert.equal(invalid.requiresConfirmation, false);
  assert.ok(log.some((line) => line.includes("REJECTED: applyExploreFilter")));

  const confirmation = await router.dispatch({ name: "setPreference", key: "notifications", value: true });
  assert.equal(confirmation.requiresConfirmation, true);
  assert.ok(log.some((line) => line.includes("PROPOSED: setPreference")));

  console.log("commandRouter.test.ts passed");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
