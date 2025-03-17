const { dynamicCommand } = require("../utils/dynamicCommand");
const { loadCommonFunctions } = require("../utils/loadCommonFunctions");
const { isSpamDetectionActive } = require("../utils/database");
const { onlyNumbers } = require("../utils");

const spamDetection = {};

exports.onMessagesUpsert = async ({ socket, messages }) => {
  if (!messages.length) {
    return;
  }

  for (const webMessage of messages) {
    const commonFunctions = loadCommonFunctions({ socket, webMessage });
    if (!commonFunctions) {
      continue;
    }

    const messageText = webMessage.message.conversation;
    const remoteJid = webMessage.key.remoteJid;
    const senderJid = webMessage.key.participant || webMessage.key.remoteJid;

    if (isSpamDetectionActive(remoteJid)) {
      if (!spamDetection[remoteJid]) {
        spamDetection[remoteJid] = {};
      }

      if (!spamDetection[remoteJid][senderJid]) {
        spamDetection[remoteJid][senderJid] = {
          text: messageText,
          count: 1,
          lastMessage: messageText,
        };
      } else {
        if (spamDetection[remoteJid][senderJid].text === messageText) {
          spamDetection[remoteJid][senderJid].count++;
        } else {
          spamDetection[remoteJid][senderJid] = {
            text: messageText,
            count: 1,
            lastMessage: messageText,
          };
        }
      }

      if (spamDetection[remoteJid][senderJid].count >= 5 && spamDetection[remoteJid][senderJid].lastMessage === messageText) {
        await socket.groupParticipantsUpdate(remoteJid, [senderJid], "remove");
        await socket.sendMessage(remoteJid, {
          text: `🚫 Eliminé a @${onlyNumbers(senderJid)} porque intentó hacer *spam*`,
          mentions: [senderJid],
        });
        delete spamDetection[remoteJid][senderJid];
      }
    }

    await dynamicCommand(commonFunctions);
  }
};