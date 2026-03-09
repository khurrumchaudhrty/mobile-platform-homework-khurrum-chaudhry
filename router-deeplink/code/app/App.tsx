import React, { useEffect, useMemo, useState } from "react";
import { Alert, Linking, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AgentFlyout } from "./src/presentation/components/AgentFlyout";
import { HomeScreen } from "./src/presentation/screens/HomeScreen";
import { ExploreScreen } from "./src/presentation/screens/ExploreScreen";
import { ProfileScreen } from "./src/presentation/screens/ProfileScreen";
import { CommandRouter, createCommandRouter } from "./src/domain/commands/commandRouter";
import { ActivityLogEntry, createActivityLogger } from "./src/domain/commands/activityLog";
import { PreferenceStore, createPreferenceStore } from "./src/data/storage/preferenceStore";
import { exportAuditLog, getPreference, setPreference } from "./src/native/nativeModules";
import { parseUrl } from "./src/data/parsing/routeParser";

type Screen = "home" | "explore" | "profile";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [exploreFilter, setExploreFilter] = useState("active");
  const [exploreSort, setExploreSort] = useState("newest");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [flyoutOpen, setFlyoutOpen] = useState(true);

  useEffect(() => {
    getPreference("notifications").then((value) => setNotificationsEnabled(value));
  }, []);

  useEffect(() => {
    const handleUrl = (url: string) => {
      try {
        console.log("[deeplink] received url:", url);
        const request = parseUrl(url);
        console.log("[deeplink] parsed route:", request.route, request.params);
        if (request.route === "home" || request.route === "explore" || request.route === "profile") {
          setScreen(request.route);
        }
      } catch (error) {
        console.log("[deeplink] parse failed:", error);
        logger.logRejected("deeplink", "invalid-url");
      }
    };

    const subscription = Linking.addEventListener("url", (event) => handleUrl(event.url));
    Linking.getInitialURL().then((url) => {
      console.log("[deeplink] initial url:", url);
      if (url) handleUrl(url);
    });

    return () => subscription.remove();
  }, [logger]);

  const prefs = useMemo<PreferenceStore>(() => createPreferenceStore({
    get: () => notificationsEnabled,
    set: (value: boolean) => {
      setNotificationsEnabled(value);
      setPreference("notifications", value);
    },
  }), [notificationsEnabled]);

  const logger = useMemo(() => createActivityLogger({
    append: (entry: ActivityLogEntry) => setActivityLog((prev) => [entry, ...prev])
  }), []);

  const router = useMemo<CommandRouter>(() => createCommandRouter({
    navigate: (route) => setScreen(route),
    openFlyout: () => setFlyoutOpen(true),
    closeFlyout: () => setFlyoutOpen(false),
    setPreference: (key, value) => {
      if (key === "notifications") prefs.set(value);
    },
    applyExploreFilter: (filter, sort) => {
      setExploreFilter(filter);
      if (sort) setExploreSort(sort);
      setScreen("explore");
    },
    showAlert: (title, message) => {
      logger.logInfo(`ALERT: ${title} - ${message}`);
    },
    exportAuditLog: async (logText: string) => {
      const ok = await exportAuditLog(logText);
      logger.logInfo(ok ? "EXPORT: audit log written" : "EXPORT: failed");
      return ok;
    },
    getAuditLogText: () => JSON.stringify(activityLog, null, 2),
    logger,
  }), [prefs, logger]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {screen === "home" && <HomeScreen messages={messages} />}
        {screen === "explore" && (
          <ExploreScreen
            filter={exploreFilter}
            sort={exploreSort}
            onChangeFilter={setExploreFilter}
            onChangeSort={setExploreSort}
          />
        )}
        {screen === "profile" && (
          <ProfileScreen
            notificationsEnabled={notificationsEnabled}
            onToggleNotifications={setNotificationsEnabled}
            activityLog={activityLog}
            onExportAuditLog={() => {
              const command = { name: "exportAuditLog" } as const;
              router.dispatch(command).then((result) => {
                if (result.requiresConfirmation) {
                  Alert.alert(
                    "Confirm export",
                    "Write the audit log to device storage?",
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "Confirm", onPress: () => router.confirm(command) }
                    ]
                  );
                }
              });
            }}
          />
        )}
      </View>
      <AgentFlyout
        router={router}
        activityLog={activityLog}
        messages={messages}
        onMessagesChange={setMessages}
        open={flyoutOpen}
        onToggle={() => setFlyoutOpen((prev) => !prev)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0E1B2A" },
  content: { flex: 1 }
});
