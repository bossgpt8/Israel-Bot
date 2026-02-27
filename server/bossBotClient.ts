import axios from "axios";

const BOSS_BOT_API_URL = process.env.BOSS_BOT_BACKEND_URL || "https://your-boss-bot-backend.com";

export class BossBotClient {
  private baseUrl: string;

  constructor(baseUrl: string = BOSS_BOT_API_URL) {
    this.baseUrl = baseUrl;
  }

  async linkQR(userId: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/link/qr`, { userId });
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        throw new Error(err.response.data.message || "Failed to generate QR code");
      }
      throw err;
    }
  }

  async linkCode(userId: string, phone: string) {
    try {
      const cleanPhone = phone.replace(/\D/g, "");
      const response = await axios.post(`${this.baseUrl}/link/code`, { userId, phone: cleanPhone });
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        throw new Error(err.response.data.message || "Failed to get pairing code");
      }
      throw err;
    }
  }

  async getStatus(userId: string) {
    try {
      log(`Calling external status for ${userId} at ${this.baseUrl}/status`);
      const response = await axios.get(`${this.baseUrl}/status`, { 
        params: { userId },
        timeout: 10000 // 10 second timeout
      });
      return response.data;
    } catch (err: any) {
      log(`Bot client status error: ${err.message}`, "error");
      return { connected: false, status: "disconnected", error: "Bot backend unreachable" };
    }
  }

  async sendMessage(userId: string, to: string, message: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/send`, { userId, to, message });
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        throw new Error(err.response.data.message || "Failed to send message");
      }
      throw err;
    }
  }

  async disconnect(userId: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/disconnect`, { userId });
      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        throw new Error(err.response.data.message || "Failed to disconnect");
      }
      throw err;
    }
  }
}

export const bossBotClient = new BossBotClient();
