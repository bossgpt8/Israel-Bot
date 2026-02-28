import axios from "axios";

const BOSS_BOT_API_URL = process.env.BOSS_BOT_BACKEND_URL || "https://your-boss-bot-backend.com";

export class BossBotClient {
  constructor(baseUrl = BOSS_BOT_API_URL) {
    this.baseUrl = baseUrl;
  }

  async linkQR(userId) {
    try {
      const response = await axios.post(`${this.baseUrl}/link/qr`, { userId });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to generate QR code");
    }
  }

  async linkCode(userId, phone) {
    try {
      const cleanPhone = phone.replace(/\D/g, "");
      const response = await axios.post(`${this.baseUrl}/link/code`, { userId, phone: cleanPhone });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to get pairing code");
    }
  }

  async getStatus(userId) {
    try {
      const response = await axios.get(`${this.baseUrl}/status`, { params: { userId }, timeout: 10000 });
      return response.data;
    } catch (err) {
      return { connected: false, status: "disconnected", error: "Bot backend unreachable" };
    }
  }

  async sendMessage(userId, to, message) {
    try {
      const response = await axios.post(`${this.baseUrl}/send`, { userId, to, message });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to send message");
    }
  }

  async disconnect(userId) {
    try {
      const response = await axios.post(`${this.baseUrl}/disconnect`, { userId });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to disconnect");
    }
  }
}

export const bossBotClient = new BossBotClient();
