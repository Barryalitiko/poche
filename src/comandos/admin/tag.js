const { PREFIX } = require("../../krampus");

module.exports = {
  name: "hide-tag",
  description: "Para mencionar a todos, incluso si se responde a un mensaje.",
  commands: ["tag", "t"],
  usage: `${PREFIX}hidetag motivo`,
  handle: async ({ fullArgs, sendText, socket, remoteJid, sendReact, message, sendMediaMessage }) => {
    try {
      // Obtener la metadata del grupo (para obtener los participantes)
      const { participants } = await socket.groupMetadata(remoteJid);
      
      // Extraer los IDs de los participantes para mencionarlos
      const mentions = participants.map(({ id }) => id);

      // Reaccionar al mensaje con un emoji para indicar que el bot está procesando
      await sendReact("📎");

      if (message && message.quotedMessage) {
        // Verificar si el mensaje original tiene una cita (respuesta a otro mensaje)
        if (message.quotedMessage.type === 'text') {
          // Si el mensaje citado es de tipo texto, responder con ese mismo mensaje y mencionar a todos
          await sendText(`\n\n${message.quotedMessage.text}`, mentions, message.key);
        } else if (message.quotedMessage.type === 'image') {
          // Si el mensaje citado tiene una imagen, reenviar la imagen con el texto y mencionar a todos
          await sendMediaMessage(remoteJid, message.quotedMessage.imageMessage, { caption: `Etiquetando a todos:\n\n${fullArgs}`, mentions });
        }
      } else {
        // Si el comando no se usó como respuesta, solo enviar el texto y mencionar a todos
        await sendText(`\n\n${fullArgs}`, mentions);
      }
    } catch (error) {
      console.error("Error en hide-tag:", error);
    }
  },
};
