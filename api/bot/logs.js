import { storage } from "./storage.js"; // ✅ go up one folder if storage.js is in api/

export default async function handler(req, res) {
  const userId = req.query.userId || "default";

  // ✅ Only allow GET and DELETE
  if (req.method === "GET") {
    // SSE route
    if (req.url.includes("/stream")) {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      });

      const logs = await storage.getUserLogs(userId);
      logs.reverse().forEach(log => {
        res.write(`data: ${JSON.stringify(log)}\n\n`);
      });

      // Keep connection open for SSE if needed
      // Here we just send current logs and close
      return res.end();
    }

    // Normal GET for logs
    try {
      const logs = await storage.getUserLogs(userId);
      return res.status(200).json(logs);
    } catch (err) {
      console.error("Logs GET error:", err);
      return res.status(500).json({ error: "Unable to fetch logs" });
    }
  }

  // DELETE route
  else if (req.method === "DELETE") {
    try {
      if (userId !== "default") {
        await storage.clearUserLogs(userId);
      } else {
        await storage.clearLogs();
      }
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Logs DELETE error:", err);
      return res.status(500).json({ error: "Unable to clear logs" });
    }
  }

  // Method not allowed
  else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
