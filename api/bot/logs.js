import { storage } from "./storage.js";

export default async function handler(req, res) {
  const userId = req.query.userId || "default";
  
  if (req.method === "GET") {
    // Better SSE check using path matching
    if (req.url.includes("/stream")) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      
      const logs = await storage.getUserLogs(userId);
      logs.reverse().forEach(log => {
        res.write(`data: ${JSON.stringify(log)}\n\n`);
      });
      
      return res.end();
    }

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
  
  res.status(405).json({ message: "Method not allowed" });
}
