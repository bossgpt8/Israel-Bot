import { KnightBotClient } from "./knightBotClient";
import { storage } from "./storage";

export class BotManager {
  private clients: Map<string, KnightBotClient> = new Map();
  private logListeners: Map<string, Set<(log: any) => void>> = new Map();

  private getClient(userId: string = "default") {
    if (!this.clients.has(userId)) {
      this.clients.set(userId, new KnightBotClient(userId));
    }
    return this.clients.get(userId)!;
  }

  public async getStatus(userId: string = "default") {
    try {
      const client = this.getClient(userId);
      const remoteStatus = await client.getStatus();
      return {
        status: remoteStatus.status, // online, offline, etc
        qr: remoteStatus.qr || null,
        pairingCode: remoteStatus.pairingCode || null,
        uptime: remoteStatus.uptime || 0,
        currentUserId: userId === "default" ? null : userId,
        linkedWhatsAppNumber: remoteStatus.linkedNumber || null
      };
    } catch (err) {
      return { status: "offline", qr: null, pairingCode: null, uptime: 0, currentUserId: userId };
    }
  }

  public async start(phoneNumber?: string, forceNewSession: boolean = true, userId: string = "default") {
    const client = this.getClient(userId);
    this.log(userId, "info", "Requesting connection from external engine...");
    try {
      if (phoneNumber) {
        const res = await client.getPairingCode(phoneNumber);
        this.log(userId, "info", `Pairing code received: ${res.code}`);
      } else {
        const res = await client.getQR();
        this.log(userId, "info", "QR Code generated.");
      }
    } catch (err: any) {
      this.log(userId, "error", `Failed to start: ${err.message}`);
    }
  }

  public async stop(userId: string = "default") {
    const client = this.getClient(userId);
    try {
      await client.disconnect();
      this.log(userId, "info", "Bot disconnected.");
    } catch (err: any) {
      this.log(userId, "error", `Failed to disconnect: ${err.message}`);
    }
  }

  public async logout(userId: string = "default") {
    await this.stop(userId);
    this.log(userId, "info", "Logged out.");
  }

  public subscribeLogs(userId: string, listener: (log: any) => void) {
    if (!this.logListeners.has(userId)) {
      this.logListeners.set(userId, new Set());
    }
    this.logListeners.get(userId)!.add(listener);
    return () => {
      this.logListeners.get(userId)?.delete(listener);
    };
  }

  private async log(userId: string, level: "info" | "warn" | "error", message: string) {
    const logData = { level, message, timestamp: new Date().toISOString(), userId };
    console.log(`[${userId.toUpperCase()}] [${level.toUpperCase()}] ${message}`);
    await storage.addUserLog(userId, level, message);
    const listeners = this.logListeners.get(userId);
    if (listeners) {
      listeners.forEach(listener => listener(logData));
    }
  }
}

export const botManager = new BotManager();
