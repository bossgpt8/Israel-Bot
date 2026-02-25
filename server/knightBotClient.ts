import axios from "axios";

const API_BASE_URL = process.env.KNIGHTBOT_API_URL || "https://your-knightbot-api.com";

export class KnightBotClient {
  private userId: string;

  constructor(userId: string = "default") {
    this.userId = userId;
  }

  async getQR() {
    const response = await axios.post(`${API_BASE_URL}/link/qr`, { userId: this.userId });
    return response.data;
  }

  async getPairingCode(phone: string) {
    const response = await axios.post(`${API_BASE_URL}/link/code`, { userId: this.userId, phone });
    return response.data;
  }

  async getStatus() {
    const response = await axios.get(`${API_BASE_URL}/status`, { params: { userId: this.userId } });
    return response.data;
  }

  async sendMessage(to: string, message: string) {
    const response = await axios.post(`${API_BASE_URL}/send`, { userId: this.userId, to, message });
    return response.data;
  }

  async disconnect() {
    const response = await axios.post(`${API_BASE_URL}/disconnect`, { userId: this.userId });
    return response.data;
  }
}
