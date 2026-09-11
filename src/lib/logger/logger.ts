type LogLevel = "info" | "warn" | "error" | "debug";

export const logger = {
  log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
    const logObject = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...meta,
    };
    if (process.env.NODE_ENV === "production") {
      console.log(JSON.stringify(logObject));
    } else {
      console.log(`[${logObject.timestamp}] [${level.toUpperCase()}]: ${message}`, meta || "");
    }
  },
  info(message: string, meta?: Record<string, unknown>) {
    this.log("info", message, meta);
  },
  warn(message: string, meta?: Record<string, unknown>) {
    this.log("warn", message, meta);
  },
  error(message: string, meta?: Record<string, unknown>) {
    this.log("error", message, meta);
  },
};