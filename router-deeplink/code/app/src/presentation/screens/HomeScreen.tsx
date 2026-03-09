import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type Props = {
  messages: string[];
};

export function HomeScreen({ messages }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.body}>Welcome to the Router Deep Link demo.</Text>
      <Text style={styles.sectionTitle}>User / Agent Messages</Text>
      <ScrollView style={styles.messageList} contentContainerStyle={styles.messageListContent}>
        {messages.length === 0 ? (
          <Text style={styles.emptyText}>No messages yet.</Text>
        ) : (
          messages.map((message, index) => (
            <Text key={`${message}-${index}`} style={styles.message}>
              {message}
            </Text>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { color: "#FFFFFF", fontSize: 22, marginBottom: 6 },
  body: { color: "#B6C7D8", fontSize: 14, marginBottom: 18 },
  sectionTitle: { color: "#8CA3B8", fontSize: 12, marginBottom: 8 },
  messageList: { flex: 1 },
  messageListContent: { paddingBottom: 24 },
  message: {
    color: "#E8F4FF",
    fontSize: 12,
    marginBottom: 6,
    backgroundColor: "#19324A",
    padding: 8,
    borderRadius: 6,
  },
  emptyText: { color: "#8CA3B8", fontSize: 12 },
});
