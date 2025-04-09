const { PREFIX } = require("../../krampus");

module.exports = {
  name: "ping",
  description: "Verifica si el bot está online.",
  commands: ["ping"],
  usage: `${PREFIX}ping`,
  handle: async ({ sendReact, socket, remoteJid }) => {
    const startTime = Date.now();
    await sendReact("👻");
    const endTime = Date.now();
    const latency = endTime - startTime;

    const speed = latency.toFixed(2) + "ms";
    let statusEmoji = "🟢";
    if (latency > 300) {
      statusEmoji = "🔴";
    } else if (latency > 100) {
      statusEmoji = "🟡";
    }

    const fakeQuoted = {
      key: {
        remoteJid: remoteJid,
        fromMe: false,
        id: "FAKE-QUOTE-PING",
        participant: "-1@s.whatsapp.net",
      },
      message: {
        conversation: "Poche bot\n by Krampus",
      },
    };

    await socket.sendMessage(remoteJid, {
      text: `${statusEmoji} *Bot activo*\n📡 Velocidad de respuesta: *${speed}*`,
    }, { quoted: fakeQuoted });
  },
};
