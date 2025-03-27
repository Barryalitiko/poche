const fs = require("fs");
const { PREFIX } = require("../../krampus");

const CONFIG_FILE = "./config/autojoin.json"; // Archivo donde se guarda la configuración

// Función para cargar la configuración desde el JSON
const cargarConfig = () => {
  if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({}, null, 2));
  }
  return JSON.parse(fs.readFileSync(CONFIG_FILE));
};

// Función para guardar la configuración en el JSON
const guardarConfig = (config) => {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
};

module.exports = {
  name: "autojoin",
  description: "Activa o desactiva la aprobación automática de solicitudes en un grupo.",
  commands: ["autojoin"],
  usage: `${PREFIX}autojoin on/off`,
  handle: async ({ sendReply, args, remoteJid, isGroup }) => {
    if (!isGroup) return sendReply("❌ Este comando solo puede usarse en grupos.");

    let config = cargarConfig();
    let estado = args[0]?.toLowerCase();

    if (estado === "on") {
      config[remoteJid] = true;
      sendReply("✅ La aprobación automática de solicitudes está ACTIVADA para este grupo.");
    } else if (estado === "off") {
      config[remoteJid] = false;
      sendReply("❌ La aprobación automática de solicitudes está DESACTIVADA para este grupo.");
    } else {
      return sendReply("⚠️ Uso incorrecto. Usa: *!autojoin on* o *!autojoin off*.");
    }

    guardarConfig(config);
  },
};

// Escucha eventos de solicitudes de ingreso a grupos
socket.ev.on("group-participants.update", async (update) => {
  let config = cargarConfig();
  let groupId = update.id;

  if (config[groupId] && update.action === "add_request") {
    try {
      await socket.groupAcceptInviteV4(groupId, update.participants);
      console.log(`✅ Se aprobó automáticamente la solicitud de ${update.participants} en el grupo ${groupId}`);
    } catch (error) {
      console.error("❌ Error al aprobar solicitud:", error);
    }
  }
});
