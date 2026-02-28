import { bossBotClient } from "../bossBotClient.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { action, phoneNumber, userId } = req.body;
  try {
    switch (action) {
      case "start":
        const qrData = await bossBotClient.linkQR(userId || "default");
        return res.status(200).json({ success: true, qr: qrData.qr });
      case "link-code":
        const codeData = await bossBotClient.linkCode(userId || "default", phoneNumber);
        return res.status(200).json({ success: true, code: codeData.code });
      case "stop":
      case "logout":
        await bossBotClient.disconnect(userId || "default");
        return res.status(200).json({ success: true, message: "Bot disconnected." });
      default:
        return res.status(400).json({ message: "Invalid action" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
