import { NativeModules, Platform } from "react-native";

const NativeAuditLogExporter = NativeModules.AuditLogExporter;
const NativePreferenceStore = NativeModules.PreferenceStore;

let inMemoryPreference = false;

export async function exportAuditLog(logText: string): Promise<boolean> {
  if (NativeAuditLogExporter?.exportLog) {
    return NativeAuditLogExporter.exportLog(logText);
  }
  return false;
}

export async function getPreference(key: string): Promise<boolean> {
  if (NativePreferenceStore?.getBool) {
    return NativePreferenceStore.getBool(key);
  }
  return inMemoryPreference;
}

export async function setPreference(key: string, value: boolean): Promise<boolean> {
  if (NativePreferenceStore?.setBool) {
    return NativePreferenceStore.setBool(key, value);
  }
  inMemoryPreference = value;
  return true;
}

export const nativeStatus = {
  hasExporter: !!NativeAuditLogExporter,
  hasPreferenceStore: !!NativePreferenceStore,
  platform: Platform.OS
};
