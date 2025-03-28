const { PREFIX, TEMP_DIR } = require("../../krampus");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const path = require("path");
const fs = require("fs");
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
    sendStickerFromBuffer,
  }) => {
    if (!isImage && !isVideo) {
      throw new InvalidParameterError(
        "ummm... Debes indicarme lo que quieres que convierta a sticker\n> Krampus OM bot"
      );
    }

    if (isImage) {
      const inputPath = await downloadImage(webMessage, "input");
      const imageBuffer = fs.readFileSync(inputPath);

      // Crear sticker desde imagen
      const sticker = new Sticker(imageBuffer, {
        type: "full",
        pack: "Operacion Marshall", // Nombre del pack
        author: "Krampus OM bot", // Autor del sticker
      });

      await sticker.build(); // Construir el sticker antes de convertirlo
      const stickerBuffer = await sticker.toBuffer();

      await sendPuzzleReact();
      await sendStickerFromBuffer(stickerBuffer);

      fs.unlinkSync(inputPath);
    } else {
      const inputPath = await downloadVideo(webMessage, "input");
      const sizeInSeconds = 10;

      const seconds =
        webMessage.message?.videoMessage?.seconds ||
        webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage
          ?.videoMessage?.seconds;

      if (seconds > sizeInSeconds) {
        fs.unlinkSync(inputPath);
        await sendErrorReply(
          `¡ABUSADOR! Este video tiene más de ${sizeInSeconds} segundos. Envía un video más corto.`
        );
        return;
      }

      const videoBuffer = fs.readFileSync(inputPath);

      // Crear sticker desde video
      const sticker = new Sticker(videoBuffer, {
        type: "full",
        pack: "Operacion Marshall",
        author: "Krampus OM bot",
      });

      await sticker.build();
      const stickerBuffer = await sticker.toBuffer();

      await sendPuzzleReact();
      await sendStickerFromBuffer(stickerBuffer);

      fs.unlinkSync(inputPath);
    }
  },
};