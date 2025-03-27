const fs = require("fs");
const path = require("path");
const { PREFIX } = require("../../krampus");

const krFilePath = path.resolve(process.cwd(), "assets/kr.json");
const userItemsFilePath = path.resolve(process.cwd(), "assets/userItems.json");

const readData = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return [];
  }
};

const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = {
  name: "tienda",
  description: "Compra objetos en la tienda con tus monedas.",
  commands: ["tienda"],
  usage: `${PREFIX}tienda <objeto>`,
  handle: async ({ sendReply, args, userJid }) => {
    const precios = {
      "💍": 170,
      "✏️": 7,
      "🏆": 10, // Añadimos el trofeo
      "🍄": 300, // Añadimos el hongo
    };

    const objeto = args[0]?.toLowerCase();
    if (!objeto) {
      let listaPrecios = "🛒 *Lista de precios de la tienda*:\n";
      for (const [item, precio] of Object.entries(precios)) {
        listaPrecios += `- ${item}: ${precio} monedas\n`;
      }
      listaPrecios += `\nUsa *${PREFIX}tienda <emoji>* para comprar.\n> Por ejemplo: *${PREFIX}tienda 💍*`;
      await sendReply(listaPrecios);
      return;
    }

    if (!precios[objeto]) {
      await sendReply("❌ Objeto inválido.\nUsa el comando sin argumentos para ver la lista de objetos.");
      return;
    }

    let krData = readData(krFilePath);
    let userKrEntry = krData.find(entry => entry.userJid === userJid);

    if (!userKrEntry) {
      userKrEntry = { userJid, kr: 0 };
      krData.push(userKrEntry);
    }

    if (userKrEntry.kr < precios[objeto]) {
      await sendReply(`❌ No tienes suficientes monedas.\nNecesitas ${precios[objeto]} monedas para comprar ${objeto}.`);
      return;
    }

    let userItems = readData(userItemsFilePath);
    let userItemEntry = userItems.find(entry => entry.userJid === userJid);

    if (!userItemEntry) {
      userItemEntry = { userJid, items: { anillos: 0, papeles: 0, trofeos: 0, hongos: 0 } };
      userItems.push(userItemEntry);
    }

    if (objeto === "💍") {
      userItemEntry.items.anillos += 1;
    } else if (objeto === "✏️") {
      userItemEntry.items.papeles += 1;
    } else if (objeto === "🏆") {
      userItemEntry.items.trofeos += 1;
    } else if (objeto === "🍄") {
      userItemEntry.items.hongos += 1;
    }

    userKrEntry.kr -= precios[objeto];

    writeData(userItemsFilePath, userItems);
    writeData(krFilePath, krData);

    await sendReply(`✅ ¡Has comprado ${objeto}!\nAhora tienes ${userKrEntry.kr} monedas y:\n- 💍: ${userItemEntry.items.anillos}\n- ✏️: ${userItemEntry.items.papeles}\n- 🏆: ${userItemEntry.items.trofeos}\n- 🍄: ${userItemEntry.items.hongos}`);
  },
};