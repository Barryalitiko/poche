const { PREFIX } = require("../../krampus");
const fs = require("fs");
const path = require("path");

// Ruta del archivo JSON que almacena la configuración de cada grupo
const configPath = path.resolve(__dirname, "../../config/grupos.json");

// Función para cargar la configuración desde el JSON
const cargarConfiguracion = () => {
  if (!fs.existsSync(configPath)) return {};
  return JSON.parse(fs.readFileSync(configPath));
};

// Función para guardar la configuración en el JSON
const guardarConfiguracion = (config) => {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
};

module.exports = {
  name: "autoaprobar",
  description: "Activa o desactiva la aprobación automática de solicitudes en un grupo.",
  commands: ["autoaprobar"],
  usage: `${PREFIX}autoaprobar [on/off]`,
  handle: async ({ socket, remoteJid, sendReply, args }) => {
    try {
      if (!remoteJid.endsWith("@g.us")) {
        return sendReply("❌ Este comando solo puede usarse en grupos.");
      }

      let config = cargarConfiguracion();
      if (!config[remoteJid]) {
        config[remoteJid] = { autoAprobar: false };
      }

      if (args.length === 0) {
        return sendReply(`📌 Estado actual: ${config[remoteJid].autoAprobar ? "Activado" : "Desactivado"}\nUso: ${PREFIX}autoaprobar [on/off]`);
      }

      if (args[0].toLowerCase() === "on") {
        config[remoteJid].autoAprobar = true;
        guardarConfiguracion(config);
        return sendReply("✅ Aprobación automática ACTIVADA en este grupo.");
      } else if (args[0].toLowerCase() === "off") {
        config[remoteJid].autoAprobar = false;
        guardarConfiguracion(config);
        return sendReply("❌ Aprobación automática DESACTIVADA en este grupo.");
      } else {
        return sendReply(`⚠️ Opción inválida. Usa \"on\" o \"off\".`);
      }
    } catch (error) {
      console.error("Error en autoaprobar:", error);
      sendReply("⚠️ Ocurrió un error al cambiar la configuración.");
    }
  },
};

// Listener para aprobar solicitudes automáticamente
const { eventListener } = require("../../krampus");
eventListener.on("group-participants-update", async ({ id, participants, action, socket }) => {
  try {
    let config = cargarConfiguracion();
    if (config[id] && config[id].autoAprobar && action === "invite") {
      for (let participant of participants) {
        await socket.groupParticipantsUpdate(id, [participant], "add");
      }
    }
  } catch (error) {
    console.error("Error al aprobar solicitudes automáticamente:", error);
  }
});
