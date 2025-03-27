const { PREFIX, TEMP_DIR } = require("../../krampus");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const path = require("path");
const fs = require("fs");
const { Sticker } = require("wa-sticker-formatter");

module.exports = {
  name: "sticker",
  description: "Convierte imágenes, GIFs o videos en stickers.",
  commands: ["s", "sticker"],
  usage: `${PREFIX}sticker (menciona imagen/gif/vídeo) o responde a una imagen/gif/vídeo`,
  handle: async ({
    isImage,
    isVideo,
    downloadImage,
    downloadVideo,
    webMessage,
    sendErrorReply,
    sendSuccessReact,
    sendStickerFromFile,
  }) => {
    if (!isImage && !isVideo) {
      throw new InvalidParameterError(
        "📌 Debes marcar una imagen, GIF o video para convertirlo en sticker.\n> Krampus OM bot"
      );
    }

    const inputPath = path.resolve(TEMP_DIR, "input.tmp");
    const outputPath = path.resolve(TEMP_DIR, "output.webp");

    try {
      let buffer;
      if (isImage) {
        buffer = fs.readFileSync(await downloadImage(webMessage, inputPath));
      } else {
        buffer = fs.readFileSync(await downloadVideo(webMessage, inputPath));

        const seconds =
          webMessage.message?.videoMessage?.seconds ||
          webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage
            ?.videoMessage?.seconds;

        if (seconds > 10) {
          throw new InvalidParameterError(
            "❌ ¡ABUSADOR! Este video tiene más de 10 segundos. Envíame uno más corto."
          );
        }
      }

      // Crear el sticker con nombre y autor personalizados
      const sticker = new Sticker(buffer, {
        type: "full",
        pack: "Operación Marshall", // Nombre del sticker pack
        author: "Krampus OM bot", // Autor del sticker
        quality: 90,
      });

      await sticker.toFile(outputPath);

      await sendSuccessReact();
      await sendStickerFromFile(outputPath);
    } catch (error) {
      console.error("❌ Error al crear el sticker:", error);
      await sendErrorReply("⚠️ Ocurrió un error al crear el sticker.");
    } finally {
      // Elimina archivos temporales para evitar acumulación
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    }
  },
};
