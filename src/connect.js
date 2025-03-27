const path = require("path");
const { question, onlyNumbers } = require("./utils");
const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  isJidBroadcast,
  isJidStatusBroadcast,
  proto,
  isJidNewsletter,
} = require("baileys");
const NodeCache = require("node-cache");
const pino = require("pino");
const { load } = require("./loader");
const {
  warningLog,
  infoLog,
  errorLog,
  sayLog,
  successLog,
} = require("./utils/logger");

const msgRetryCounterCache = new NodeCache();

async function getMessage(key) {
  return proto.Message.fromObject({});
}

async function connect() {
  // Ruta donde se guarda la autenticación
  const authPath = path.resolve(__dirname, "..", "assets", "auth", "baileys");
  const { state, saveCreds } = await useMultiFileAuthState(authPath);

  // Obtener la versión más reciente de Baileys
  const { version } = await fetchLatestBaileysVersion();

  // Crear el socket de conexión a WhatsApp
  const socket = makeWASocket({
    version,
    logger: pino({ level: "error" }),
    printQRInTerminal: true, // Mostrar el código QR en la terminal
    defaultQueryTimeoutMs: 60 * 1000,
    auth: state,
    shouldIgnoreJid: (jid) =>
      isJidBroadcast(jid) || isJidStatusBroadcast(jid) || isJidNewsletter(jid),
    keepAliveIntervalMs: 60 * 1000,
    markOnlineOnConnect: true,
    msgRetryCounterCache,
    shouldSyncHistoryMessage: () => false,
    getMessage,
  });

  // Si no está registrado, pedir emparejamiento
  if (!socket.authState.creds.registered) {
    warningLog("¡Credenciales no configuradas!");

    infoLog('Ingrese su número sin el + (ejemplo: "13733665556"):');

    const phoneNumber = await question("Ingresa el número: ");

    if (!phoneNumber) {
      errorLog(
        '¡Número de teléfono inválido! Reinicia con el comando "npm start".'
      );
      process.exit(1);
    }

    const code = await socket.requestPairingCode(onlyNumbers(phoneNumber));

    sayLog(`Código de emparejamiento: ${code}`);
  }

  // Manejo de eventos de conexión
  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;

      if (statusCode === DisconnectReason.loggedOut) {
        errorLog("¡Sesión cerrada!");
      } else {
        switch (statusCode) {
          case DisconnectReason.badSession:
            warningLog("¡Sesión no válida!");
            break;
          case DisconnectReason.connectionClosed:
            warningLog("¡Conexión cerrada!");
            break;
          case DisconnectReason.connectionLost:
            warningLog("¡Conexión perdida!");
            break;
          case DisconnectReason.connectionReplaced:
            warningLog("¡Sesión reemplazada en otro dispositivo!");
            break;
          case DisconnectReason.multideviceMismatch:
            warningLog("¡Dispositivo incompatible!");
            break;
          case DisconnectReason.forbidden:
            warningLog("¡Acceso prohibido!");
            break;
          case DisconnectReason.restartRequired:
            infoLog('Reiniciando... Usa "npm start" para volver a iniciar.');
            break;
          case DisconnectReason.unavailableService:
            warningLog("¡Servicio no disponible!");
            break;
          default:
            warningLog("Desconexión inesperada, reconectando...");
            break;
        }

        // Intentar reconectar automáticamente
        setTimeout(async () => {
          const newSocket = await connect();
          load(newSocket);
        }, 5000);
      }
    } else if (connection === "open") {
      successLog("¡Bot conectado exitosamente!");
    } else {
      infoLog("Cargando datos...");
    }
  });

  // Guardar credenciales cuando se actualicen
  socket.ev.on("creds.update", saveCreds);

  return socket;
}

// Exportar la función de conexión
exports.connect = connect;