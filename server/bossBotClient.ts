import axios from "axios";

const BOSS_BOT_API_URL = process.env.BOSS_BOT_BACKEND_URL || "https://your-boss-bot-backend.com";

export class BossBotClient {
  private baseUrl: string;

  constructor(baseUrl: string = BOSS_BOT_API_URL) {
    this.baseUrl = baseUrl;
  }

  async linkQR(userId: string) {
    const response = await axios.post(`${this.baseUrl}/link/qr`, { userId });
    return response.data;
  }

  async linkCode(userId: string, phone: string) {
    const response = await axios.post(`${this.baseUrl}/link/code`, { userId, phone });
    return response.data;
  }

  async getStatus(userId: string) {
    const response = await axios.get(`${this.baseUrl}/status`, { params: { userId } });
    return response.data;
  }

  async sendMessage(userId: string, to: string, message: string) {
    const response = await axios.post(`${this.baseUrl}/send`, { userId, to, message });
    return response.data;
  }

  async disconnect(userId: string) {
    const response = await axios.post(`${this.baseUrl}/disconnect`, { userId });
    return response.data;
  }
}

export const bossBotClient = new BossBotClient();
