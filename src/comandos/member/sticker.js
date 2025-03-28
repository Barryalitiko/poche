const { PREFIX, TEMP_DIR } = require("../../krampus");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const path = require("path");
const fs = require("fs").promises;
const { Sticker } = require("wa-sticker-formatter");

module.exports = {
  name: "sticker",
  description: "Crea stickers de imagen/gif/vídeo",
  commands: ["s", "sticker"],
  usage: `${PREFIX}sticker (etiqueta imagen/gif/vídeo) o ${PREFIX}sticker (responde a imagen/gif/vídeo)`,
  handle: async ({
    isImage,
    isVideo,
    downloadImage,
    downloadVideo,
    webMessage,
    sendErrorReply,
    sendPuzzleReact,
    sendStickerFromFile,
  }) => {
    try {
      if (!isImage && !isVideo) {
        throw new InvalidParameterError(
          "Ummm... Debes indicarme lo que quieres que convierta a sticker.\n> Krampus OM bot"
        );
      }

      const outputPath = path.resolve(TEMP_DIR, "output.webp");

      if (isImage) {
        // Descargar la imagen
        const inputPath = await downloadImage(webMessage, "input");
        const imageBuffer = await fs.readFile(inputPath);

        // Crear sticker desde imagen
        const sticker = new Sticker(imageBuffer, {
          type: "full",
          pack: "Operacion Marshall",
          author: "Krampus OM bot",
        });

        const stickerBuffer = await sticker.toBuffer();
        await fs.writeFile(outputPath, stickerBuffer);

        await sendPuzzleReact();
        await sendStickerFromFile(outputPath);

        // Limpiar archivos temporales
        await fs.unlink(inputPath);
        await fs.unlink(outputPath);
      } else {
        // Descargar el video
        const inputPath = await downloadVideo(webMessage, "input");

        const sizeInSeconds = 10;

        // Obtener duración del video
        const seconds =
          webMessage.message?.videoMessage?.seconds ||
          webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.seconds;

        if (!seconds || seconds > sizeInSeconds) {
          await fs.unlink(inputPath);
          await sendErrorReply(
            `¡ABUSADOR! Este video tiene más de ${sizeInSeconds} segundos. Envía un video más corto.`
          );
          return;
        }

        const videoBuffer = await fs.readFile(inputPath);

        // Crear sticker desde video
        const sticker = new Sticker(videoBuffer, {
          type: "full",
          pack: "Operacion Marshall",
          author: "Krampus OM bot",
        });

        const stickerBuffer = await sticker.toBuffer();
        await fs.writeFile(outputPath, stickerBuffer);

        await sendPuzzleReact();
        await sendStickerFromFile(outputPath);

        // Limpiar archivos temporales
        await fs.unlink(inputPath);
        await fs.unlink(outputPath);
      }
    } catch (error) {
      console.error("Error en el comando sticker:", error);
      await sendErrorReply("Ocurrió un error al crear el sticker. Inténtalo nuevamente.");
    }
  },
};