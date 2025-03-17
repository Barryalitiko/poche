const fs = require("fs");
const path = require("path");
const { PREFIX } = require("../../krampus");

const commandStatusFilePath = path.resolve(process.cwd(), "assets/monedas.json");
const usageStatsFilePath = path.resolve(process.cwd(), "assets/usageStats.json");
const krFilePath = path.resolve(process.cwd(), "assets/kr.json");

const readData = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return {};
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error al escribir en el archivo ${filePath}: ${error.message}`);
  }
};

const TIEMPO_TRABAJO_MS = 3 * 60 * 1000; // 5 minutos en milisegundos

module.exports = {
  name: "trabajo",
  description: "Elige un trabajo y gana monedas en 5 minutos.",
  commands: ["trabajo"],
  usage: `${PREFIX}trabajo`,
  handle: async ({ sendReply, userJid, args }) => {
    const trabajoStatus = readData(commandStatusFilePath);
    if (trabajoStatus.commandStatus !== "on") {
      await sendReply("❌ El sistema de trabajos está desactivado.");
      return;
    }

    const trabajoStats = readData(usageStatsFilePath);
    trabajoStats.users = trabajoStats.users || {};
    const userStats = trabajoStats.users[userJid] || { trabajo: null, inicioTrabajo: null };

    if (userStats.trabajo) {
      const tiempoPasado = Date.now() - userStats.inicioTrabajo;
      if (tiempoPasado >= TIEMPO_TRABAJO_MS) {
        // Si ya pasó el tiempo, procesar el pago inmediato
        await pagarTrabajo(userJid, userStats.trabajo, sendReply);
        return;
      } else {
        const tiempoRestante = Math.ceil((TIEMPO_TRABAJO_MS - tiempoPasado) / 1000);
        await sendReply(`❌ Ya estás trabajando como *${userStats.trabajo}*. Te pagarán en ${Math.ceil(tiempoRestante / 60)} minutos.`);
        return;
      }
    }

    if (args.length === 0) {
      const trabajosDisponibles = [
        "Motoconcho",
        "Dembowsero",
        "Banquera",
        "Delivery",
        "Colmadero",
        "Atracador",
        "Pintor",
        "Policia",
        "Cuero",
        "Bachatero"
      ];

      const listaTrabajos = trabajosDisponibles.map((trabajo, index) => `${index + 1}. **${trabajo}**`).join("\n");

      await sendReply(`💼 *Profesiones disponibles:*\n\n${listaTrabajos}\n\nUsa el comando \`#trabajo <profesión>\` para elegir uno.`);
      return;
    }

    const trabajos = [
      { nombre: "Motoconcho", pago: [80, 100, 200] },
      { nombre: "Dembowsero", pago: [80, 100, 200] },
      { nombre: "Banquera", pago: [80, 100, 200] },
      { nombre: "Delivery", pago: [80, 100, 200] },
      { nombre: "Colmadero", pago: [80, 100, 200] },
      { nombre: "Atracador", pago: [80, 100, 200] },
      { nombre: "Pintor", pago: [80, 100, 200] },
      { nombre: "Guachiman", pago: [80, 100, 200] },
      { nombre: "Cuero", pago: [80, 100, 200] },
      { nombre: "Bachatero", pago: [80, 100, 200] }
    ];

    const trabajoElegido = trabajos.find(t => t.nombre.toLowerCase() === args.join(" ").toLowerCase());
    if (!trabajoElegido) {
      await sendReply("❌ Profesión no válida. Usa el comando #trabajo para ver las profesiones disponibles.");
      return;
    }

    userStats.trabajo = trabajoElegido.nombre;
    userStats.inicioTrabajo = Date.now();
    trabajoStats.users[userJid] = userStats;
    writeData(usageStatsFilePath, trabajoStats);

    await sendReply(`💼 Has comenzado tu trabajo como *${trabajoElegido.nombre}*.\n\n⏳ El pago será en 3 minutos.`);

    setTimeout(async () => {
      await pagarTrabajo(userJid, trabajoElegido.nombre, sendReply);
    }, TIEMPO_TRABAJO_MS);
  }
};

async function pagarTrabajo(userJid, trabajo, sendReply) {
  const trabajos = {
    Motoconcho: { pago: [80, 100, 200], mensajes: { 80: "Diache, solo 80 pesos.", 100: "Buen día, hiciste 100 pesos.", 200: "Coronaste con 200 pesos!" } },
    Dembowsero: { pago: [80, 100, 200], mensajes: { 80: "Solo 80 pesos por tu demo.", 100: "Un party te dejó 100 pesos.", 200: "Pegaste un tema, 200 pesos!" } },
    Banquera: { pago: [80, 100, 200], mensajes: { 80: "80 pesos, floja la venta.", 100: "Te dejaron 100 de propina.", 200: "200 pesos, ¡rompiste la banca!" } },
    Delivery: { pago: [80, 100, 200], mensajes: { 80: "Malas propinas, 80 pesos.", 100: "100 pesos, no está mal.", 200: "Buena propina, 200 pesos!" } },
    Colmadero: { pago: [80, 100, 200], mensajes: { 80: "80 pesos, día flojo.", 100: "Vendiste bien, 100 pesos.", 200: "Colmado lleno, 200 pesos!" } },
    Atracador: { pago: [80, 100, 200], mensajes: { 80: "Mal golpe, solo 80 pesos.", 100: "Coronaste con 100 pesos.", 200: "200 pesos, pero cuídate!" } },
    Pintor: { pago: [80, 100, 200], mensajes: { 80: "80 pesos, desastre de pintura.", 100: "100 pesos por buen trabajo.", 200: "200 pesos, eres un artista!" } },
    Guachiman: { pago: [80, 100, 200], mensajes: { 80: "80 pesos, día tranquilo.", 100: "100 pesos en multas.", 200: "200 pesos en 'coimas'!" } },
    Cuero: { pago: [80, 100, 200], mensajes: { 80: "80 pesos, poca clientela.", 100: "100 pesos, buen día.", 200: "200 pesos, ¡tú sí sabes!" } },
    Bachatero: { pago: [80, 100, 200], mensajes: { 80: "80 pesos, nadie te oyó.", 100: "100 pesos, algo pegaste.", 200: "200 pesos, ¡Romeo eres tú!" } }
  };

  const pago = trabajos[trabajo].pago[Math.floor(Math.random() * trabajos[trabajo].pago.length)];
  const mensaje = trabajos[trabajo].mensajes[pago];

  let krData = readData(krFilePath);
  let userKr = krData.find(entry => entry.userJid === userJid) || { userJid, kr: 0 };
  userKr.kr += pago;
  krData = krData.map(entry => (entry.userJid === userJid ? userKr : entry));
  writeData(krFilePath, krData);

  let trabajoStats = readData(usageStatsFilePath);
  delete trabajoStats.users[userJid];
  writeData(usageStatsFilePath, trabajoStats);

  await sendReply(`🛠️ Tu trabajo como *${trabajo}* ha terminado.\n\n💰 ${mensaje}\n\n💵 Saldo: ${userKr.kr} kr.`);
}