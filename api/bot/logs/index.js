import { storage } from "../storage.js";

export default async function handler(req, res) {
  const userId = req.query.userId || "default";
  if (req.method === "GET") {
    const logs = await storage.getUserLogs(userId);
    return res.status(200).json(logs);
  } else if (req.method === "DELETE") {
    if (userId !== "default") {
      await storage.clearUserLogs(userId);
    } else {
      await storage.clearLogs();
    }
    return res.status(200).json({ success: true });
  }
  res.status(405).end();
}
