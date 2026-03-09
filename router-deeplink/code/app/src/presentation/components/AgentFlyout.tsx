import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CommandRouter } from "../../domain/commands/commandRouter";
import { ActivityLogEntry } from "../../domain/commands/activityLog";
import { sendToGroq } from "../../data/groqClient";

type Props = {
  router: CommandRouter;
  activityLog: ActivityLogEntry[];
  messages: string[];
  onMessagesChange: (updater: (prev: string[]) => string[]) => void;
  open: boolean;
  onToggle: () => void;
};

export function AgentFlyout({ router, activityLog, messages, onMessagesChange, open, onToggle }: Props) {
  const [input, setInput] = useState("");
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const suggestedActions = useMemo(
    () => [
      { label: "Go to Home", command: { name: "navigate", screen: "home" } },
      { label: "Go to Explore", command: { name: "navigate", screen: "explore" } },
      { label: "Open Profile", command: { name: "navigate", screen: "profile" } },
      { label: "Enable Notifications", command: { name: "setPreference", key: "notifications", value: true } },
      { label: "Open Flyout", command: { name: "openFlyout" } },
      { label: "Close Flyout", command: { name: "closeFlyout" } },
      { label: "Export Audit Log", command: { name: "exportAuditLog" } }
    ],
    []
  );

  const runAction = async (command: any) => {
    const result = await router.dispatch(command);
    if (result.requiresConfirmation) {
      setPendingAction(JSON.stringify(command));
      return;
    }
  };

  const confirmAction = async () => {
    if (!pendingAction) return;
    await router.confirm(JSON.parse(pendingAction));
    setPendingAction(null);
  };

  return (
    <View style={[styles.container, open ? styles.open : styles.closed]}>
      <TouchableOpacity style={styles.handle} onPress={onToggle}>
        <Text style={styles.handleText}>{open ? "Hide Agent" : "Show Agent"}</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.body}>
          <Text style={styles.title}>Agent Chat</Text>
          <TextInput
            style={styles.input}
            placeholder="Ask about the app or actions..."
            placeholderTextColor="#8CA3B8"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => {
              if (!input.trim()) return;
              const userText = input.trim();
              onMessagesChange((prev) => [`You: ${userText}`, ...prev]);
              router.ask(userText);
              sendToGroq(userText).then((reply) => {
                onMessagesChange((prev) => [`Groq: ${reply}`, ...prev]);
              });
              setInput("");
            }}
          />

          <Text style={styles.sectionTitle}>Suggested Actions</Text>
          {suggestedActions.map((item) => (
            <TouchableOpacity key={item.label} style={styles.action} onPress={() => runAction(item.command)}>
              <Text style={styles.actionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          {pendingAction && (
            <View style={styles.confirmCard}>
              <Text style={styles.confirmTitle}>Proposed Action</Text>
              <Text style={styles.confirmBody}>{pendingAction}</Text>
              <View style={styles.confirmRow}>
                <TouchableOpacity style={styles.confirmButton} onPress={confirmAction}>
                  <Text style={styles.confirmText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setPendingAction(null)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <Text style={styles.sectionTitle}>Activity Log</Text>
          {activityLog.slice(0, 3).map((entry) => (
            <Text key={entry.id} style={styles.logEntry}>{entry.message}</Text>
          ))}

          <Text style={styles.sectionTitle}>Groq Replies</Text>
          {messages.slice(0, 3).map((msg, idx) => (
            <Text key={`${msg}-${idx}`} style={styles.logEntry}>{msg}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#12263A",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  open: { height: 320 },
  closed: { height: 44 },
  handle: {
    padding: 10,
    alignItems: "center"
  },
  handleText: { color: "#CFE8FF", fontSize: 14 },
  body: { padding: 12 },
  title: { color: "#FFFFFF", fontSize: 16, marginBottom: 8 },
  input: {
    backgroundColor: "#0E1B2A",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12
  },
  sectionTitle: { color: "#8CA3B8", fontSize: 12, marginBottom: 6 },
  action: {
    backgroundColor: "#19324A",
    padding: 10,
    borderRadius: 8,
    marginBottom: 6
  },
  actionText: { color: "#E8F4FF" },
  confirmCard: {
    backgroundColor: "#1E3A5C",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8
  },
  confirmTitle: { color: "#FFFFFF", fontSize: 13, marginBottom: 4 },
  confirmBody: { color: "#CFE8FF", fontSize: 11 },
  confirmRow: { flexDirection: "row", gap: 8, marginTop: 8 },
  confirmButton: {
    marginTop: 8,
    backgroundColor: "#7AC7FF",
    padding: 8,
    borderRadius: 6,
    alignItems: "center"
  },
  confirmText: { color: "#0E1B2A", fontWeight: "600" },
  cancelButton: {
    marginTop: 8,
    backgroundColor: "#2D4B66",
    padding: 8,
    borderRadius: 6,
    alignItems: "center"
  },
  cancelText: { color: "#E8F4FF", fontWeight: "600" },
  logEntry: { color: "#B6C7D8", fontSize: 11 }
});
