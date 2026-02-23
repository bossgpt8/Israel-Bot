async function pingCommand(
    sock,
    chatId,
    senderId,
    mentionedJids,
    message,
    args,
) {
    try {
        const start = Date.now();

        // Send a tiny test message (not edited)
        await sock.sendMessage(chatId, { text: "‎" }); // invisible char

        const ping = Date.now() - start;

        await sock.sendMessage(
            chatId,
            { text: `🏓 *ᴘᴏɴɢ! ${ping} ᴍs*` },
            { quoted: message },
        );
    } catch (e) {
        console.error(e);
        await sock.sendMessage(
            chatId,
            { text: "Ping failed" },
            { quoted: message },
        );
    }
}

module.exports = pingCommand;
