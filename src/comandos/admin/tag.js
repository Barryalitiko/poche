const { PREFIX } = require("../../krampus");

module.exports = {
  name: "hide-tag",
  description: "Para mencionar a todos",
  commands: ["tag", "t"],
  usage: `${PREFIX}hidetag motivo`,

  handle: async ({ fullArgs, sendText, sendReply, socket, remoteJid, sendReact, quotedMessage }) => {
    // Obtener los participantes del grupo
    const { participants } = await socket.groupMetadata(remoteJid);
    const mentions = participants.map(({ id }) => id);

    // Enviar reacción
    await sendReact("📎");

    // Texto del mensaje
    const mensaje = fullArgs.trim() || "Atención, grupo!";
    const link = "https://www.instagram.com/_vasquezemmanuel/";

    // Datos para la previsualización
    const contextInfo = {
      isForwarded: true,
      forwardingScore: 2,
      externalAdReply: {
        title: "Soky Bot",
        body: "Operacion Marshall",
        thumbnailUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/9.png",
        sourceUrl: link,
      },
    };

    // Si el mensaje es una respuesta a otro, responder directamente
    if (quotedMessage) {
      await socket.sendMessage(remoteJid, {
        text: mensaje,
        mentions,
        contextInfo,
      }, { quoted: quotedMessage });
    } else {
      await socket.sendMessage(remoteJid, {
        text: mensaje,
        mentions,
        contextInfo,
      });
    }
  },
};