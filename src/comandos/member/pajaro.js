const { PREFIX } = require("../../krampus");

const cooldowns = new Map(); // Cooldown para evitar spam

module.exports = {
  name: "gay",
  description: "Calcula tu porcentaje de ser gay 🌈",
  commands: ["pajaro"],
  usage: `${PREFIX}gay`,
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

    // Enviar mensaje inicial
    let sentMessage = await sendReply("🏳️‍🌈 Midiendo tu pajareria...");

    // Simulación de carga con nueva barra
    const nivelesCarga = [
      "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 10%",
      "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 20%",
      "[̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅_̲̅] 30%",
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
        text: `🏳️‍🌈 Calculando tu porcentaje de pajareria...\n${nivelesCarga[i]}`,
      });
    }

    // Generar un porcentaje aleatorio
    let porcentaje = Math.floor(Math.random() * 101);

    // Mensaje final con porcentaje
    await socket.sendMessage(remoteJid, {
      text: `🌈 @${usuarioId.split("@")[0]}, eres un ${porcentaje}% pajaro. 🏳️‍🌈`,
      mentions: [usuarioId],
    });
  },
};
