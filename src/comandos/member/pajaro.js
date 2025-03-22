const { PREFIX } = require("../../krampus");

const cooldowns = new Map(); // Cooldown para evitar spam

module.exports = {
  name: "gay",
  description: "Calcula tu porcentaje de ser gay 🌈",
  commands: ["pajaro"],
  usage: `${PREFIX}gay [@usuario]`,
  handle: async ({ sendReply, socket, remoteJid, webMessage }) => {
    const usuarioId = webMessage.key.participant; // ID del usuario que usó el comando

    // Verificar cooldown (2 min)
    if (cooldowns.has(usuarioId)) {
      const tiempoRestante = (cooldowns.get(usuarioId) - Date.now()) / 1000;
      if (tiempoRestante > 0) {
        return sendReply(`⏳ Debes esperar ${Math.ceil(tiempoRestante)} segundos antes de usar este comando otra vez.`);
      }
    }

    cooldowns.set(usuarioId, Date.now() + 120000);
    setTimeout(() => cooldowns.delete(usuarioId), 120000);

    // Obtener si mencionaron a alguien o respondieron a un mensaje
    let mencionados = webMessage.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
    let personaRespondida = webMessage.message.extendedTextMessage?.contextInfo?.participant;

    let personaEvaluada = null;

    if (mencionados.length > 0) {
      personaEvaluada = mencionados[0]; // Si hay menciones, tomamos la primera
    } else if (personaRespondida) {
      personaEvaluada = personaRespondida; // Si respondieron un mensaje, tomamos a esa persona
    } else {
      // Si no mencionaron ni respondieron a nadie, el bot mide al usuario que usó el comando
      personaEvaluada = usuarioId;
    }

    // Enviar mensaje inicial
    let sentMessage = await sendReply("🏳️‍🌈 Midiendo el porcentaje...");

    // Simulación de carga con nueva barra
    const nivelesCarga = [
      "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 10%",
      "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 20%",
      "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 30%",
      "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 40%",
      "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 50%",
      "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 60%",
      "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 70%",
      "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 80%",
      "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 90%",
      "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 100%",
    ];

    for (let i = 0; i < nivelesCarga.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Espera 0.5 segundos
      await socket.sendMessage(remoteJid, {
        edit: sentMessage.key,
        text: `🏳️‍🌈 Calculando el porcentaje...\n${nivelesCarga[i]}`,
      });
    }

    // Generar un porcentaje aleatorio
    let porcentaje = Math.floor(Math.random() * 101);

    // Mensaje final con porcentaje
    await socket.sendMessage(remoteJid, {
      text: `🌈 @${personaEvaluada.split("@")[0]}, eres un ${porcentaje}% pajaro. 🏳️‍🌈`,
      mentions: [personaEvaluada],
    });
  },
};
