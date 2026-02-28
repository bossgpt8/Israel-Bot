import { storage } from "../storage.js";

export default async function handler(req, res) {
  const userId = req.query.userId || "default";
  if (req.method === "GET") {
    const settings = userId ? await storage.getUserSettings(userId) : await storage.getSettings();
    return res.status(200).json(settings);
  } else if (req.method === "PATCH") {
    const settings = userId ? await storage.updateUserSettings(userId, req.body) : await storage.updateSettings(req.body);
    return res.status(200).json(settings);
  }
  res.status(405).end();
}
