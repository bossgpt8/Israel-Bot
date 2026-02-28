import { pgTable, text, serial, boolean, timestamp, jsonb, integer, varchar, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const botSettings = pgTable("bot_settings", {
  id: serial("id").primaryKey(),
  ownerNumber: text("owner_number").default(""),
  botName: text("bot_name").default("Boss"),
  autoRead: boolean("auto_read").default(false),
  autoStatusRead: boolean("auto_status_read").default(false),
  publicMode: text("public_mode").default("public"),
  welcomeEnabled: boolean("welcome_enabled").default(false),
  goodbyeEnabled: boolean("goodbye_enabled").default(false),
  autoTyping: boolean("auto_typing").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertBotSettingsSchema = createInsertSchema(botSettings);

export const logs = pgTable("logs", {
  id: serial("id").primaryKey(),
  level: text("level").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  email: text("email").notNull(),
  linkedWhatsAppNumber: text("linked_whatsapp_number"),
  botActiveStatus: boolean("bot_active_status").default(false),
  sessionData: jsonb("session_data"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSessionSchema = createInsertSchema(userSessions);

export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  botName: text("bot_name").default("Boss"),
  ownerNumber: text("owner_number").default(""),
  autoRead: boolean("auto_read").default(false),
  autoStatusRead: boolean("auto_status_read").default(false),
  autoTyping: boolean("auto_typing").default(false),
  antiDelete: boolean("anti_delete").default(false),
  pmBlocker: boolean("pm_blocker").default(false),
  antiCall: boolean("anti_call").default(false),
  publicMode: text("public_mode").default("public"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSettingsSchema = createInsertSchema(userSettings);

export const userLogs = pgTable("user_logs", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  level: text("level").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => {
    return {
      idx: index("IDX_session_expire").on(table.expire),
    };
  }
);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
