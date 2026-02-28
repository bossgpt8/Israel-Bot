import { bossBotClient } from "../bossBotClient.js";

export default async function handler(req, res) {
  // ✅ Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // ✅ Make sure req.body exists
  let body = req.body;
  if (!body) {
    try {
      body = await new Promise((resolve, reject) => {
        let data = "";
        req.on("data", chunk => data += chunk);
        req.on("end", () => resolve(JSON.parse(data)));
        req.on("error", err => reject(err));
      });
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON body" });
    }
  }

  const { action, phoneNumber, userId } = body;

  try {
    switch (action) {
      case "start": {
        const qrData = await bossBotClient.linkQR(userId || "default");
        return res.status(200).json({ success: true, message: "QR generated", qr: qrData.qr });
      }

      case "link-code": {
        const codeData = await bossBotClient.linkCode(userId || "default", phoneNumber);
        return res.status(200).json({ success: true, message: "Code generated", code: codeData.code });
      }

      case "stop":
      case "logout": {
        await bossBotClient.disconnect(userId || "default");
        return res.status(200).json({ success: true, message: "Bot disconnected." });
      }

      default:
        return res.status(400).json({ message: "Invalid action" });
    }
  } catch (err) {
    console.error("Action error:", err);
    return res.status(500).json({ message: err.message || "Internal server error" });
  }
}
