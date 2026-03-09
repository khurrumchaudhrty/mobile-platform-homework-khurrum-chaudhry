export type ActivityLogEntry = {
  id: string;
  message: string;
  timestamp: number;
};

type LoggerAdapter = {
  append: (entry: ActivityLogEntry) => void;
};

export function createActivityLogger(adapter: LoggerAdapter) {
  const log = (message: string) => {
    adapter.append({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      message,
      timestamp: Date.now()
    });
  };

  return {
    logAccepted: (command: string) => log(`ACCEPTED: ${command}`),
    logRejected: (command: string, reason: string) => log(`REJECTED: ${command} (${reason})`),
    logInfo: (message: string) => log(message)
  };
}
