const { PREFIX } = require("../../krampus");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "menu",
  description: "Muestra el menú de comandos.",
  commands: ["menu", "help", "ayuda"],
  usage: `${PREFIX}menu`,
  handle: async ({ socket, remoteJid, sendReply }) => {
    const menuMessage = `»»————- - ————-««
> 𝗞𝗿𝗮𝗺𝗽𝘂𝘀 𝗢𝗠 𝗯𝗼𝘁
usa ${PREFIX}menu2 para ver mas detalles
══════════.K.═ 
COMANDOS: 
═.K.═════════
𝗔𝗗𝗠𝗜𝗡𝗦
⌠⅏⌡➟ ${PREFIX}cerrar
⌠⅏⌡➟ ${PREFIX}abrir
⌠⅏⌡➟ ${PREFIX}antilink 0-1-2
⌠⅏⌡➟ ${PREFIX}sx on-off
⌠⅏⌡➟ ${PREFIX}promote
⌠⅏⌡➟ ${PREFIX}demote
⌠⅏⌡➟ ${PREFIX}bienvenida 0-1-2
⌠⅏⌡➟ ${PREFIX}despedida 0-1
⌠⅏⌡➟ ${PREFIX}cambiarenlace
⌠⅏⌡➟ ${PREFIX}reaccion on-off
⌠⅏⌡➟ ${PREFIX}spam on-off
⌠⅏⌡➟ ${PREFIX}tag
⌠⅏⌡➟ ${PREFIX}todos
⌠⅏⌡➟ ${PREFIX}toimage
⌠⅏⌡➟ ${PREFIX}reglas
⌠⅏⌡➟ ${PREFIX}ban
⌠⅏⌡➟ ${PREFIX}advertencia/adv
══════════.K.═
𝗠𝗜𝗘𝗠𝗕𝗥𝗢𝗦
⌠⅏⌡➟ ${PREFIX}link
⌠⅏⌡➟ ${PREFIX}menu
⌠⅏⌡➟ ${PREFIX}menu2
⌠⅏⌡➟ ${PREFIX}reglas
⌠⅏⌡➟ ${PREFIX}musica/m + nombre de la canción
⌠⅏⌡➟ ${PREFIX}video/v + nombre del video
⌠⅏⌡➟ ${PREFIX}sticker/s
⌠⅏⌡➟ ${PREFIX}reporte/r
⌠⅏⌡➟ ${PREFIX}ping
⌠⅏⌡➟ ${PREFIX}pfp/perfil
⌠⅏⌡➟ ${PREFIX}fotogrupo
═.K.═════════

𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦 𝗦𝗫
⌠⅏⌡➟ ${PREFIX}tijera
⌠⅏⌡➟ ${PREFIX}beso
⌠⅏⌡➟ ${PREFIX}cuerno
⌠⅏⌡➟ ${PREFIX}penetrar
⌠⅏⌡➟ ${PREFIX}tocar
⌠⅏⌡➟ ${PREFIX}haiti
⌠⅏⌡➟ ${PREFIX}saborear

══════════.K.═

*JUEGOS*
⌠⅏⌡➟ ${PREFIX}data
⌠⅏⌡➟ ${PREFIX}trabajo
⌠⅏⌡➟ ${PREFIX}ruleta
⌠⅏⌡➟ ${PREFIX}tragamonedas
⌠⅏⌡➟ ${PREFIX}boda
⌠⅏⌡➟ ${PREFIX}divorcio
⌠⅏⌡➟ ${PREFIX}tienda
⌠⅏⌡➟ ${PREFIX}apuesta
⌠⅏⌡➟ ${PREFIX}tequiero
⌠⅏⌡➟ ${PREFIX}carrera
⌠⅏⌡➟ ${PREFIX}vuelta
⌠⅏⌡➟ ${PREFIX}tolentino
⌠⅏⌡➟ ${PREFIX}negocio
⌠⅏⌡➟ ${PREFIX}invertir
⌠⅏⌡➟ ${PREFIX}retirar

══════════.K.═

*𝗗𝗲𝘀𝗰𝗮𝗿𝗴𝗮𝗿 𝗩𝗶𝗱𝗲𝗼𝘀*
> ᐒtiktok
⌠⅏⌡➟ ${PREFIX}tiktok + link
> ᐒfacebook
⌠⅏⌡➟ ${PREFIX}facebook + link
> ᐒtwitter
⌠⅏⌡➟ ${PREFIX}x + link

═.K.═════════
*MINIVIDEOS*
(respondiendo a un usuario con foto de perfil)

⌠⅏⌡➟ ${PREFIX}minivideo
⌠⅏⌡➟ ${PREFIX}fea/feo
⌠⅏⌡➟ ${PREFIX}preso
⌠⅏⌡➟ ${PREFIX}gay
⌠⅏⌡➟ ${PREFIX}tilapia
⌠⅏⌡➟ ${PREFIX}tokischa
⌠⅏⌡➟ ${PREFIX}banquera


══════════.K.═
*POKEMON*

⌠⅏⌡➟ ${PREFIX}capturar
⌠⅏⌡➟ ${PREFIX}shiny 
      (400 monedas)
⌠⅏⌡➟ ${PREFIX}pokedex
⌠⅏⌡➟ ${PREFIX}evolucionar
⌠⅏⌡➟ ${PREFIX}legendario


»»————- - ————-««
> Operacion Marshall
»»————- - ————-««`;

    await socket.sendMessage(remoteJid, {
      video: fs.readFileSync("assets/sx/menu.mp4"),
      caption: menuMessage,
      gifPlayback: true,
    });
  },
};


