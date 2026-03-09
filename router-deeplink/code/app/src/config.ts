import { Platform } from "react-native";

const LOCAL_HOST = Platform.select({
  android: "127.0.0.1",
  ios: "localhost",
  default: "localhost",
});

export const GROQ_PROXY_URL = `http://${LOCAL_HOST}:8787/groq`;
