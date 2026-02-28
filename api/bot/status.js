import { bossBotClient } from "./bossBotClient.js";

export default async function handler(req, res) {
  const userId = req.query.userId || "default";
  try {
    const status = await bossBotClient.getStatus(userId);
    res.status(200).json(status);
  } catch (err) {
    console.error("Status error:", err);
    res.status(200).json({ 
      status: "offline", 
      connected: false, 
      uptime: 0, 
      error: "Service unavailable" 
    });
  }
}
