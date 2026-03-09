import React from "react";
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { ActivityLogEntry } from "../../domain/commands/activityLog";

type Props = {
  notificationsEnabled: boolean;
  onToggleNotifications: (value: boolean) => void;
  activityLog: ActivityLogEntry[];
  onExportAuditLog: () => void;
};

export function ProfileScreen({ notificationsEnabled, onToggleNotifications, activityLog, onExportAuditLog }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.preference}>
        <Text style={styles.preferenceText}>Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={onToggleNotifications} />
      </View>
      <TouchableOpacity style={styles.exportButton} onPress={onExportAuditLog}>
        <Text style={styles.exportText}>Export Audit Log</Text>
      </TouchableOpacity>
      <Text style={styles.section}>Agent Activity Log</Text>
      <ScrollView style={styles.logList} contentContainerStyle={styles.logListContent}>
        {activityLog.length === 0 ? (
          <Text style={styles.emptyLog}>No activity yet.</Text>
        ) : (
          activityLog.map((entry) => (
            <Text key={entry.id} style={styles.log}>{entry.message}</Text>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { color: "#FFFFFF", fontSize: 22, marginBottom: 16 },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  preferenceText: { color: "#CFE8FF" },
  section: { color: "#8CA3B8", fontSize: 12, marginBottom: 8 },
  logList: { flex: 1 },
  logListContent: { paddingBottom: 16 },
  log: { color: "#B6C7D8", fontSize: 12, marginBottom: 4 },
  emptyLog: { color: "#8CA3B8", fontSize: 12 },
  exportButton: {
    backgroundColor: "#19324A",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  exportText: { color: "#E8F4FF", fontWeight: "600" },
});
