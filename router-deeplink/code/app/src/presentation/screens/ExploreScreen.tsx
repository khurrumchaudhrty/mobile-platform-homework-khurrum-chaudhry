import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  filter: string;
  sort: string;
  onChangeFilter: (value: string) => void;
  onChangeSort: (value: string) => void;
};

const filters = ["active", "recent", "all"];
const sorts = ["newest", "oldest"];

export function ExploreScreen({ filter, sort, onChangeFilter, onChangeSort }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.section}>Filter</Text>
      <View style={styles.row}>
        {filters.map((value) => (
          <TouchableOpacity
            key={value}
            style={[styles.chip, filter === value && styles.chipActive]}
            onPress={() => onChangeFilter(value)}
          >
            <Text style={styles.chipText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.section}>Sort</Text>
      <View style={styles.row}>
        {sorts.map((value) => (
          <TouchableOpacity
            key={value}
            style={[styles.chip, sort === value && styles.chipActive]}
            onPress={() => onChangeSort(value)}
          >
            <Text style={styles.chipText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { color: "#FFFFFF", fontSize: 22, marginBottom: 16 },
  section: { color: "#8CA3B8", fontSize: 12, marginTop: 8 },
  row: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
  chip: {
    borderWidth: 1,
    borderColor: "#2D4B66",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8
  },
  chipActive: { backgroundColor: "#19324A" },
  chipText: { color: "#CFE8FF" }
});
