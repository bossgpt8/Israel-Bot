import { bossBotClient } from "../bossBotClient.js";

export default async function handler(req, res) {
  // ✅ Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const userId = req.query.userId || "default";

  try {
    const status = await bossBotClient.getStatus(userId);

    // ✅ Always return JSON
    return res.status(200).json({
      status: status.status || "unknown",
      connected: status.connected ?? false,
      uptime: status.uptime ?? 0,
    });
  } catch (err) {
    console.error("Status error:", err);

    return res.status(200).json({
      status: "offline",
      connected: false,
      uptime: 0,
      error: "Service unavailable",
    });
  }
}
