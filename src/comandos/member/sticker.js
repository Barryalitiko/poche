const { PREFIX, TEMP_DIR } = require("../../krampus");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

module.exports = {
  name: "sticker",
  description: "Convierte imágenes, GIFs o videos en stickers con nombre personalizado.",
  commands: ["s", "sticker", "fig", "f"],
  usage: `${PREFIX}sticker (marca imagen/gif/vídeo) o ${PREFIX}sticker (responde a imagen/gif/vídeo) [nombre]`,
  handle: async ({
    isImage,
    isVideo,
    downloadImage,
    downloadVideo,
    webMessage,
    sendErrorReply,
    sendSuccessReact,
    sendStickerFromBuffer,
    fullArgs, // Aquí obtenemos el nombre si el usuario lo pone
  }) => {
    if (!isImage && !isVideo) {
      throw new InvalidParameterError(
        "Que quieres convertir en sticker?\n\n POCHE BOT"
      );
    }

    const stickerName = fullArgs || "Operacion Marshall";
    const stickerAuthor = "POCHE BOT";

    try {
      let buffer;
      if (isImage) {
        const inputPath = await downloadImage(webMessage, "input");
        buffer = fs.readFileSync(inputPath);
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
            `👻 Krampus 👻 Este video tiene más de ${sizeInSeconds} segundos! Envía un video más corto.`
          );
          return;
        }

        const outputPath = path.resolve(TEMP_DIR, "output.webp");
        const command = `ffmpeg -i ${inputPath} -y -vcodec libwebp -loop 0 -fs 0.99M -filter_complex "[0:v] scale=512:512:force_original_aspect_ratio=decrease,fps=12,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${outputPath}`;

        await new Promise((resolve, reject) => {
          exec(command, (error) => {
            fs.unlinkSync(inputPath);
            if (error) return reject(error);
            resolve();
          });
        });

        buffer = fs.readFileSync(outputPath);
        fs.unlinkSync(outputPath);
      }

      const sticker = await createSticker(buffer, {
        type: StickerTypes.FULL,
        quality: 90,
        background: "transparent",
        pack: stickerName, 
        author: stickerAuthor, 
      });

      await sendSuccessReact();
      await sendStickerFromBuffer(sticker);

    } catch (error) {
      console.error("Error al crear el sticker:", error);
      await sendErrorReply("⚠️ Ocurrió un error al crear el sticker.");
    }
  },
};
