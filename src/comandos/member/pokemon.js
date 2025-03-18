const fs = require("fs");
const path = require("path");
const { PREFIX } = require("../../krampus");

const krFilePath = path.resolve(process.cwd(), "assets/kr.json");
const userItemsFilePath = path.resolve(process.cwd(), "assets/userItems.json");
const userPokemonsFilePath = path.resolve(process.cwd(), "assets/userPokemons.json");

const readData = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return {};  // Si hay un error, devolvemos un objeto vacío
  }
};

const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// Definir los precios para los objetos y Pokémon (agregar más Pokémon aquí)
const precios = {
  "pichu": 50,
  "bulbasaur": 100,
  "charmander": 120,
  "squirtle": 110,
  "caterpie": 50,
  "weedle": 50,
  "pidgey": 60,
  "rattata": 50,
  "spearow": 60,
  "ekans": 80,
  "sandshrew": 90,
  "vulpix": 100,
  "zubat": 50,
  "oddish": 70,
  "paras": 70,
  "diglett": 70,
  "meowth": 100,
  "psyduck": 90,
  "mankey": 85,
  "growlithe": 120,
  "poliwag": 80,
  "abra": 110,
  "machop": 90,
  "bellsprout": 75,
  "tentacool": 70,
  "geodude": 85,
  "ponyta": 120,
  "slowpoke": 100,
  "magnemite": 95,
  "doduo": 80,
  "seel": 100,
  "grimer": 90,
  "shellder": 95,
  "gastly": 110,
  "drowzee": 90,
  "krabby": 85,
  "voltorb": 95,
  "exeggcute": 80,
  "cubone": 100,
  "tyrogue": 110,
  "koffing": 90,
  "rhyhorn": 120,
  "horsea": 85,
  "goldeen": 80,
  "staryu": 100,
  "magikarp": 50,
  "eevee": 150,
  "omanyte": 200,
  "kabuto": 200,
  "dratini": 250,
  "chikorita": 120,
  "cyndaquil": 130,
  "totodile": 125,
  "sentret": 60,
  "hoothoot": 70,
  "ledyba": 65,
  "spinarak": 65,
  "chingling": 100,
  "mareep": 90,
  "hoppip": 75,
  "sunkern": 50,
  "wooper": 80,
  "pineco": 90,
  "teddiursa": 120,
  "slugma": 100,
  "swinub": 90,
  "remoraid": 85,
  "larvitar": 300,
  
  // Formas Alola y Hisuian con +30 monedas
  "sandshrew_alola": 120,
  "sandslash_alola": 120,
  "vulpix_alola": 130,
  "ninetales_alola": 130,
  "meowth_alola": 130,
  "persian_alola": 130,
  "rapidash_galar": 150,
  "slowbro_galar": 130,
  "exeggutor_alola": 110,
  "marowak_alola": 130,
  "weezing_galar": 120,
  "wooper_hisuian": 110,
  "quagsire_hisuian": 110,
  "ursaring_hisuian": 150
};

module.exports = {
  name: "tienda",
  description: "Compra Pokémon en la tienda con tus monedas.",
  commands: ["capturar"],
  usage: `${PREFIX}tienda <pokemon>`,
  handle: async ({ socket, remoteJid, sendReply, args, userJid }) => {
    const objeto = args[0]?.toLowerCase();

    if (!objeto) {
      // Mostrar lista de Pokémon disponibles
      let listaPrecios = "⚪️🔴 *Lista de Pokémon disponibles*:\n\n";
      for (const [pokemon, precio] of Object.entries(precios)) {
        listaPrecios += `- *${pokemon}*: ${precio} monedas\n`;
      }
      listaPrecios += `\nUsa *${PREFIX}capturar <pokemon>* para comprar.\n> Ejemplo: *#capturar pichu*`;

      // Enviar la lista junto con el GIF
      await socket.sendMessage(remoteJid, {
        video: fs.readFileSync("assets/sx/tiendapokemon.mp4"),
        caption: listaPrecios,
        gifPlayback: true
      });
      return;
    }

    if (!precios[objeto]) {
      await sendReply("❌ Pokémon inválido. Usa el comando sin emojis para ver la lista de Pokémon.");
      return;
    }

    let krData = readData(krFilePath);
    let userData = krData.find(entry => entry.userJid === userJid) || { userJid, kr: 0 };

    if (userData.kr < precios[objeto]) {
      await sendReply(`❌ No tienes suficientes monedas para capturar un *${objeto}*.\n> Necesitas ${precios[objeto]} monedas.`);
      return;
    }

    let userPokemons = readData(userPokemonsFilePath);
    if (!userPokemons[userJid]) {
      userPokemons[userJid] = [];
    }
    if (userPokemons[userJid].includes(objeto)) {
      await sendReply(`❌ Ya tienes un *${objeto}* en tu colección.`);
      return;
    }

    userPokemons[userJid].push(objeto);
    writeData(userPokemonsFilePath, userPokemons);

    userData.kr -= precios[objeto];
    krData = krData.map(entry => (entry.userJid === userJid ? userData : entry));
    writeData(krFilePath, krData);

    // Enviar mensaje de confirmación con el GIF
    await socket.sendMessage(remoteJid, {
      video: fs.readFileSync("assets/sx/tiendapokemon.mp4"),
      caption: `🎉 @${userJid.split("@")[0]} ha capturado a *${objeto}*! 🎉\n\nUsa *#pokedex* para ver tu colección.\n💰 Te quedan *${userData.kr}* monedas.`,
      gifPlayback: true,
      mentions: [userJid]
    });
  },
};