const { PREFIX } = require("../../krampus");

module.exports = {
  name: "delete",
  description: "Eliminar un mensaje respondido",
  commands: ["delete", "del", "eliminar"],
  usage: `${PREFIX}delete`,

  handle: async ({ sendReact, webMessage, socket, remoteJid }) => {
    await sendReact("🗑️");

    if (!webMessage.message.extendedTextMessage || !webMessage.message.extendedTextMessage.contextInfo) {
      return await sendReact("❌"); // Reacción de error si no hay mensaje citado
    }

    try {
      const key = webMessage.message.extendedTextMessage.contextInfo.stanzaId;
      const participant = webMessage.message.extendedTextMessage.contextInfo.participant;

      await socket.sendMessage(remoteJid, {
        delete: {
          remoteJid: remoteJid,
          fromMe: participant === socket.user.id,
          id: key,
          participant: participant,
        },
      });
    } catch (error) {
      console.error("Error al eliminar el mensaje:", error);
      await sendReact("❌"); // Reacción de error si falla
    }
  },
};
