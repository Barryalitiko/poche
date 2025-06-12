const { BOT_EMOJI } = require("../krampus");
const { extractDataFromMessage, baileysIs, download } = require(".");
const { waitMessage } = require("./messages");
const fs = require("fs");

const {
  updateBlockStatus,
  groupCreate,
  groupParticipantsUpdate,
  groupUpdateSubject,
  setStatus: setStatusPro,
  sendPinMessage,
  sendListMessage: sendListMessagePro,
  sendTemplateMessage: sendTemplateMessagePro,
  updatePrivacySettings: updatePrivacySettingsPro,
  createChannel,
  sendChannelMessage,
  sendReactionMessage: sendReactionMessagePro,
  setEphemeralSettings,
} = require('@fizzxydev/baileys-pro');

exports.loadCommonFunctions = ({ socket, webMessage }) => {
  const {
    args,
    commandName,
    fullArgs,
    fullMessage,
    isReply,
    prefix,
    remoteJid,
    replyJid,
    userJid,
  } = extractDataFromMessage(webMessage);

  if (!remoteJid) {
    return null;
  }
  // Detección de tipos de medios
  const isImage = baileysIs(webMessage, "image");
  const isVideo = baileysIs(webMessage, "video");
  const isSticker = baileysIs(webMessage, "sticker");

  // Funciones para descargar los archivos según el tipo
  const downloadImage = async (webMessage, fileName) => {
    return await download(webMessage, fileName, "image", "png");
  };

  const downloadSticker = async (webMessage, fileName) => {
    return await download(webMessage, fileName, "sticker", "webp");
  };

  const downloadVideo = async (webMessage, fileName) => {
    return await download(webMessage, fileName, "video", "mp4");
  };

  // Función para manejar los medios si se activa
  const handleMediaMessage = async (processMedia) => {
    if (!processMedia) return; // Solo procesa si se activa específicamente

    if (isImage) {
      console.log("Procesando imagen...");
      const imagePath = await downloadImage(webMessage, "image");
      return { type: "image", path: imagePath };
    }

    if (isVideo) {
      console.log("Procesando video...");
      const videoPath = await downloadVideo(webMessage, "video");
      return { type: "video", path: videoPath };
    }

    console.log("No se detectó imagen ni video.");
    return null;
  };

  // Funciones para enviar textos y respuestas
  const sendText = async (text, mentions) => {
    let optionalParams = {};

    if (mentions?.length) {
      optionalParams = { mentions };
    }

    return await socket.sendMessage(remoteJid, {
      text: `${BOT_EMOJI} ${text}`,
      ...optionalParams,
    });
  };

  // Función para enviar respuesta a un mensaje
  const sendReply = async (text) => {
    return await socket.sendMessage(
      remoteJid,
      { text: `${BOT_EMOJI} ${text}` },
      { quoted: webMessage }
    );
  };

  // Funciones para reacciones comunes
  const sendReact = async (emoji) => {
    return await socket.sendMessage(remoteJid, {
      react: {
        text: emoji,
        key: webMessage.key,
      },
    });
  };

  const sendSuccessReact = async () => {
    return await sendReact("✅");
  };
  
    const sendPuzzleReact = async () => {
    return await sendReact("🧩");
  };
  
      const sendLinkReact = async () => {
    return await sendReact("🔗");
  };
  
      const sendBasuraReact = async () => {
    return await sendReact("🗑️");
  };

    const sendWelcomeReact = async () => {
    return await sendReact("🫂");
  };

  const sendMusicReact = async () => {
    return await sendReact("🎵");
  };

  const sendWarningReply = async (text) => {
    await sendWarningReact();
    return await sendReply(`⚠️ Advertencia! ${text}`);
  };

  const sendWarningReact = async () => {
    return await sendReact("⚠️");
  };

  const sendWaitReact = async () => {
    return await sendReact("⏳");
  };

  const sendErrorReact = async () => {
    return await sendReact("❌");
  };

  const sendSuccessReply = async (text) => {
    await sendSuccessReact();
    return await sendReply(`👻 ${text}`);
  };

  const sendWaitReply = async (text) => {
    await sendWaitReact();
    return await sendReply(`⏳ Espera! ${text || waitMessage}`);
  };

  const sendErrorReply = async (text) => {
    await sendErrorReact();
    return await sendReply(`☠ Error! ${text}`);
  };

  const sendAudioFromURL = async (url) => {
    try {
      console.log(`Enviando audio desde URL: ${url}`);
      return await socket.sendMessage(
        remoteJid,
        {
          audio: { url },
          mimetype: "audio/mpeg",
        },
        { quoted: webMessage }
      );
    } catch (error) {
      console.error("Error al enviar el audio:", error);
      throw new Error("No se pudo enviar el audio.");
    }
  };

  const sendVideoFromURL = async (url) => {
    console.log(`Enviando video desde URL: ${url}`);
    return await socket.sendMessage(
      remoteJid,
      {
        video: { url },
      },
      { quoted: webMessage }
    );
  };

  const sendStickerFromFile = async (file) => {
    return await socket.sendMessage(
      remoteJid,
      {
        sticker: fs.readFileSync(file),
      },
      { quoted: webMessage }
    );
  };

  const sendStickerFromURL = async (url) => {
    return await socket.sendMessage(
      remoteJid,
      {
        sticker: { url },
      },
      { url, quoted: webMessage }
    );
  };

  const sendMessage = async ({ messageType, caption = '', mimetype = '', url = '' }) => {
    try {
      let messageContent = {};

      if (messageType === 'audio') {
        messageContent = { audio: { url }, mimetype };
      } else if (messageType === 'video') {
        messageContent = { video: { url }, caption, mimetype };
      } else if (messageType === 'image') {
        messageContent = { image: { url }, caption, mimetype };
      }

      await socket.sendMessage(remoteJid, messageContent, { quoted: webMessage });
      console.log(`${messageType} enviado con éxito.`);
    } catch (error) {
      console.error(`Error al enviar el mensaje de tipo ${messageType}:`, error);
    }
  };

  const sendVideoFromFile = async (filePath, caption = '') => {
    console.log(`Enviando video desde archivo: ${filePath}`);
    return await socket.sendMessage(
      remoteJid,
      {
        video: fs.readFileSync(filePath),
        caption: caption,
      },
      { quoted: webMessage }
    );
  };

  const sendImageFromFile = async (file, caption = "") => {
    return await socket.sendMessage(
      remoteJid,
      {
        image: fs.readFileSync(file),
        caption: caption ? `${BOT_EMOJI} ${caption}` : "",
      },
      { quoted: webMessage }
    );
  };
  
    const sendImageFromURL = async (url, caption = "") => {
    return await socket.sendMessage(
      remoteJid,
      {
        image: { url },
        caption: caption ? `${BOT_EMOJI} ${caption}` : "",
      },
      { url, quoted: webMessage }
    );
  };
  
  const sendReplyWithButton = async (text, buttons) => {
  const buttonMessage = {
    text,
    footer: "",
    buttons: buttons,
    headerType: 1,
  };

  return await socket.sendMessage(remoteJid, buttonMessage, { quoted: webMessage });
};

const blockUser = async (phoneNumber) => {
  try {
    const jid = `${phoneNumber.replace(/\D/g, '')}@s.whatsapp.net`;
    await updateBlockStatus(socket, jid, 'block');
    return await sendSuccessReply(`Usuario ${phoneNumber} bloqueado.`);
  } catch (error) {
    console.error("Error al bloquear:", error);
    return await sendErrorReply(`No se pudo bloquear a ${phoneNumber}.`);
  }
};

const unblockUser = async (phoneNumber) => {
  try {
    const jid = `${phoneNumber.replace(/\D/g, '')}@s.whatsapp.net`;
    await updateBlockStatus(socket, jid, 'unblock');
    return await sendSuccessReply(`Usuario ${phoneNumber} desbloqueado.`);
  } catch (error) {
    console.error("Error al desbloquear:", error);
    return await sendErrorReply(`No se pudo desbloquear a ${phoneNumber}.`);
  }
};

const createGroup = async (subject, participants) => {
  try {
    const group = await groupCreate(socket, subject, participants.map(p => `${p.replace(/\D/g, '')}@s.whatsapp.net`));
    return await sendSuccessReply(`Grupo "${subject}" creado. ID: ${group.id}`);
  } catch (error) {
    console.error("Error al crear grupo:", error);
    return await sendErrorReply("No se pudo crear el grupo.");
  }
};

const updateGroupParticipants = async (groupId, participants, action) => {
  try {
    await groupParticipantsUpdate(socket, groupId, participants.map(p => `${p.replace(/\D/g, '')}@s.whatsapp.net`), action);
    return await sendSuccessReply(`Participantes ${action} correctamente.`);
  } catch (error) {
    console.error("Error al actualizar participantes:", error);
    return await sendErrorReply(`No se pudo ${action} participantes.`);
  }
};

const updateGroupSubject = async (groupId, subject) => {
  try {
    await groupUpdateSubject(socket, groupId, subject);
    return await sendSuccessReply(`Nombre del grupo cambiado a "${subject}".`);
  } catch (error) {
    console.error("Error al cambiar nombre del grupo:", error);
    return await sendErrorReply("No se pudo actualizar el nombre.");
  }
};

const sendAdvancedListMessage = async (title, description, buttonText, sections) => {
  try {
    const listMsg = {
      text: title,
      footer: "",
      title: description,
      buttonText,
      sections,
    };
    return await socket.sendMessage(remoteJid, listMsg, { quoted: webMessage });
  } catch (error) {
    console.error("Error en mensaje de lista:", error);
    return await sendErrorReply("No se pudo enviar el mensaje de lista.");
  }
};

const setStatus = async (content, type = 'text', options = {}) => {
  try {
    let statusContent;
    if (type === 'text') {
      statusContent = content;
    } else if (['image', 'video'].includes(type)) {
      statusContent = { url: content, mimetype: type === 'image' ? 'image/jpeg' : 'video/mp4' };
    } else {
      throw new Error('Tipo de estado inválido');
    }
    await setStatusPro(socket, statusContent, type, options);
    return await sendSuccessReply(`Estado ${type} actualizado.`);
  } catch (error) {
    console.error("Error al subir estado:", error);
    return await sendErrorReply("No se pudo subir el estado.");
  }
};

const pinMessage = async (chatId, messageId) => {
  try {
    await sendPinMessage(socket, chatId, messageId, true);
    return await sendSuccessReply(`Mensaje fijado en ${chatId}.`);
  } catch (error) {
    console.error("Error al fijar:", error);
    return await sendErrorReply("No se pudo fijar el mensaje.");
  }
};

const unpinMessage = async (chatId, messageId) => {
  try {
    await sendPinMessage(socket, chatId, messageId, false);
    return await sendSuccessReply(`Mensaje desfijado de ${chatId}.`);
  } catch (error) {
    console.error("Error al desfijar:", error);
    return await sendErrorReply("No se pudo desfijar.");
  }
};

const sendTemplateMessage = async (jid, template) => {
  try {
    await sendTemplateMessagePro(socket, jid, template);
    return await sendSuccessReply(`Plantilla enviada a ${jid}.`);
  } catch (error) {
    console.error("Error al enviar plantilla:", error);
    return await sendErrorReply("No se pudo enviar plantilla.");
  }
};

const updatePrivacy = async (settings) => {
  try {
    await updatePrivacySettingsPro(socket, settings);
    return await sendSuccessReply("Privacidad actualizada.");
  } catch (error) {
    console.error("Error en privacidad:", error);
    return await sendErrorReply("No se pudo actualizar privacidad.");
  }
};

const createChannelWrapper = async (name, description) => {
  try {
    const channel = await createChannel(socket, name, description);
    return await sendSuccessReply(`Canal "${name}" creado con ID: ${channel.id}`);
  } catch (error) {
    console.error("Error al crear canal:", error);
    return await sendErrorReply("No se pudo crear canal.");
  }
};

const sendChannelMessageWrapper = async (channelId, message) => {
  try {
    await sendChannelMessage(socket, channelId, message);
    return await sendSuccessReply(`Mensaje enviado a canal ${channelId}.`);
  } catch (error) {
    console.error("Error al enviar a canal:", error);
    return await sendErrorReply("No se pudo enviar al canal.");
  }
};

const sendReaction = async (key, reaction) => {
  try {
    await sendReactionMessagePro(socket, key, reaction);
    return await sendSuccessReply(`Reacción ${reaction} enviada.`);
  } catch (error) {
    console.error("Error al reaccionar:", error);
    return await sendErrorReply("No se pudo enviar reacción.");
  }
};

const setEphemeral = async (jid, duration) => {
  try {
    await setEphemeralSettings(socket, jid, duration);
    return await sendSuccessReply(`Mensajes efímeros configurados para ${jid}.`);
  } catch (error) {
    console.error("Error al configurar efímeros:", error);
    return await sendErrorReply("No se pudo configurar efímeros.");
  }
};

  return {
    args,
    commandName,
    downloadImage,
    downloadSticker,
    downloadVideo,
    fullArgs,
    fullMessage,
    handleMediaMessage,
    isReply,
    isSticker,
    isVideo,
    isImage,
    prefix,
    remoteJid,
    replyJid,
    sendText,
    sendReply,
    socket,
    userJid,
    webMessage,
    sendReact,
    sendPuzzleReact,
    sendImageFromFile,
    sendImageFromURL,
    sendSuccessReact,
    sendMusicReact,
    sendWarningReply,
    sendWarningReact,
    sendWaitReact,
    sendErrorReact,
    sendSuccessReply,
    sendWaitReply,
    sendErrorReply,
    sendAudioFromURL,
    sendVideoFromURL,
    sendStickerFromFile,
    sendStickerFromURL,
    sendMessage,
    sendBasuraReact,
    sendWelcomeReact,
    sendVideoFromFile,
    sendLinkReact,
    sendReplyWithButton,
    sendReplyWithButton,
  blockUser,
  unblockUser,
  createGroup,
  updateGroupParticipants,
  updateGroupSubject,
  sendAdvancedListMessage,
  setStatus,
  pinMessage,
  unpinMessage,
  sendTemplateMessage,
  updatePrivacy,
  createChannelWrapper,
  sendChannelMessageWrapper,
  sendReaction,
  setEphemeral,
  };
};
