const { PREFIX, TEMP_DIR } = require("../../krampus");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const path = require("path");
const fs = require("fs");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

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
    if (!isImage && !isVideo) {
      throw new InvalidParameterError(
        "ummm... Debes indicarme lo que quieres que convierta a sticker\n> Krampus OM bot"
      );
    }

    const outputPath = path.resolve(TEMP_DIR, "output.webp");

    if (isImage) {
      const inputPath = await downloadImage(webMessage, "input");
      const imageBuffer = fs.readFileSync(inputPath);

      // Crear sticker desde imagen
      const sticker = new Sticker(imageBuffer, {
        pack: "Operacion Marshall", // Nombre del pack
        author: "POCHE\n By Krampus OM", // Autor del sticker
        type: StickerTypes.FULL,
        quality: 80,
      });

      const stickerBuffer = await sticker.build(); // Generar el sticker

      fs.writeFileSync(outputPath, stickerBuffer); // Guardar el sticker como archivo

      await sendPuzzleReact();
      await sendStickerFromFile(outputPath);

      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    } else {
      const inputPath = await downloadVideo(webMessage, "input");

      const sizeInSeconds = 10;

      const seconds =
        webMessage.message?.videoMessage?.seconds ||
        webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage
          ?.videoMessage?.seconds;

      if (seconds > sizeInSeconds) {
        fs.unlinkSync(inputPath);
        await sendErrorReply(`¡ABUSADOR! Este video tiene más de ${sizeInSeconds} segundos. Envía un video más corto.`);
        return;
      }

      const videoBuffer = fs.readFileSync(inputPath);

      // Crear sticker desde video
      const sticker = new Sticker(videoBuffer, {
        pack: "Operacion Marshall",
        author: "POCHE bot",
        type: StickerTypes.FULL,
        quality: 80,
      });

      const stickerBuffer = await sticker.build();

      fs.writeFileSync(outputPath, stickerBuffer);

      await sendPuzzleReact();
      await sendStickerFromFile(outputPath);

      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    }
  },
};
