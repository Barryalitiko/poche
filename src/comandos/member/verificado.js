const { PREFIX } = require("../../krampus");
const axios = require("axios");

module.exports = {
  name: "estilizado",
  description: "Envía un mensaje con un formato especial 🎭",
  commands: ["krampus"],
  usage: `${PREFIX}estilizado`,
  handle: async ({ sendReply, socket, remoteJid }) => {
    try {
      // URL de la imagen para la prueba
      let imageUrl = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";

      // Descargar la imagen como buffer
      let response = await axios.get(imageUrl, { responseType: "arraybuffer" });
      let imageBuffer = Buffer.from(response.data, "binary");

      // Crear el mensaje con el estilo personalizado
      let messageContent = {
        image: imageBuffer,  // Buffer de la imagen descargada
        caption: "KrampusOM",  // Mensaje que acompaña la imagen
        mimetype: "image/png",  // Tipo MIME de la imagen (en este caso PNG)
      };

      // Agregar el mensaje estilizado con orden
      let estilo = {
        key: {
          fromMe: false,
          participant: "0@s.whatsapp.net",
        },
        message: {
          orderMessage: {
            itemCount: 0000000,
            status: 1,
            surface: 1,
            message: messageContent.caption,  // El mensaje que contiene la imagen
            orderTitle: "Bang",  // Título del mensaje (opcional)
            thumbnail: imageBuffer,  // Usar la imagen como thumbnail
            thumbnailMimeType: "image/png",  // Especificar el tipo de la miniatura
            sellerJid: "0@s.whatsapp.net",  // Vendedor (por defecto puede ser "0@s.whatsapp.net")
          }
        }
      };

      // Enviar el mensaje estilizado
      await socket.sendMessage(remoteJid, messageContent, { quoted: estilo });

    } catch (error) {
      console.error("❌ Error enviando el mensaje estilizado:", error);
      sendReply("⚠️ Ocurrió un error al enviar el mensaje estilizado.");
    }
  },
};
