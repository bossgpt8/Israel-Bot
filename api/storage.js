import { db } from "./db.js";
import { eq, desc } from "drizzle-orm";
import {
  botSettings,
  userSettings,
  userSessions,
  userLogs,
} from "./schema.js";

export const storage = {
  async getSettings() {
    const [settings] = await db.select().from(botSettings).where(eq(botSettings.id, 1));
    if (!settings) {
      const [newSettings] = await db.insert(botSettings).values({
        botName: "Boss",
        ownerNumber: "2349164898577",
        publicMode: "public",
      }).returning();
      return newSettings;
    }
    return settings;
  },

  async updateSettings(updates) {
    const [settings] = await db.update(botSettings).set(updates).where(eq(botSettings.id, 1)).returning();
    return settings;
  },

  async getUserLogs(userId, limit = 100) {
    return await db.select().from(userLogs).where(eq(userLogs.userId, userId)).limit(limit).orderBy(desc(userLogs.timestamp));
  },

  async clearUserLogs(userId) {
    await db.delete(userLogs).where(eq(userLogs.userId, userId));
  },

  async clearLogs() {
    await db.delete(userLogs).where(eq(userLogs.userId, "default"));
  },

  async getUserSettings(userId) {
    const [settings] = await db.select().from(userSettings).where(eq(userSettings.userId, userId));
    if (!settings) {
      const [newSettings] = await db.insert(userSettings).values({ userId, botName: "Boss", publicMode: "public" }).returning();
      return newSettings;
    }
    return settings;
  },

  async updateUserSettings(userId, updates) {
    const [settings] = await db.update(userSettings).set(updates).where(eq(userSettings.userId, userId)).returning();
    return settings;
  }
};
