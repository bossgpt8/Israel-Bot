import axios from "axios";

const BOSS_BOT_API_URL = process.env.BOSS_BOT_BACKEND_URL || "https://your-boss-bot-backend.com";

export class BossBotClient {
  constructor(baseUrl = BOSS_BOT_API_URL) {
    this.baseUrl = baseUrl;
  }

  async linkQR(userId) {
    const response = await axios.post(`${this.baseUrl}/link/qr`, { userId });
    return response.data;
  }

  async linkCode(userId, phone) {
    const cleanPhone = phone.replace(/\D/g, "");
    const response = await axios.post(`${this.baseUrl}/link/code`, { userId, phone: cleanPhone });
    return response.data;
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
    const response = await axios.post(`${this.baseUrl}/send`, { userId, to, message });
    return response.data;
  }

  async disconnect(userId) {
    const response = await axios.post(`${this.baseUrl}/disconnect`, { userId });
    return response.data;
  }
}

export const bossBotClient = new BossBotClient();
