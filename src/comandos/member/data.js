const fs = require("fs");
const path = require("path");
const { PREFIX } = require("../../krampus");

const MARRIAGE_FILE_PATH = path.resolve(process.cwd(), "assets/marriage.json");
const KR_FILE_PATH = path.resolve(process.cwd(), "assets/kr.json");
const USER_ITEMS_FILE_PATH = path.resolve(process.cwd(), "assets/userItems.json");
const HEARTS_FILE_PATH = path.resolve(process.cwd(), "assets/hearts.json");

const surnames = [
  "González", "Rodríguez", "Gómez", "Fernández", "López", 
  "Martínez", "Pérez", "García", "Sánchez", "Ramírez", 
  "Torres", "Flores", "Rivera", "Álvarez", "Castro", 
  "Ortiz", "Vargas", "Reyes", "Morales", "Herrera", 
  "Mendoza", "Jiménez", "Ramos", "Romero", "Chávez", 
  "Guerrero", "Ibarra", "Salazar", "Vega", "Delgado"
];

const getRandomSurname = () => {
  return surnames[Math.floor(Math.random() * surnames.length)];
};

const readData = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error al escribir en el archivo ${filePath}: ${error.message}`);
  }
};

const assignInitialKr = (userJid) => {
  const krData = readData(KR_FILE_PATH);
  if (!krData.find(entry => entry.userJid === userJid)) {
    krData.push({ userJid, kr: 50 });
    writeData(KR_FILE_PATH, krData);
  }
};

const assignInitialHearts = (userJid) => {
  const heartsData = readData(HEARTS_FILE_PATH);
  if (!heartsData.find(entry => entry.userJid === userJid)) {
    heartsData.push({ userJid, hearts: 0, streak: 0, lastUsed: null });
    writeData(HEARTS_FILE_PATH, heartsData);
  }
};

module.exports = {
  name: "data",
  description: "Ver tu información matrimonial y estado actual.",
  commands: ["data"],
  usage: `${PREFIX}data`,
  handle: async ({ sendReply, userJid }) => {
    assignInitialKr(userJid);
    assignInitialHearts(userJid);
    const marriageData = readData(MARRIAGE_FILE_PATH);
    const krData = readData(KR_FILE_PATH);
    const userItems = readData(USER_ITEMS_FILE_PATH);
    const heartsData = readData(HEARTS_FILE_PATH);

    const userKr = krData.find(entry => entry.userJid === userJid);
    const userKrBalance = userKr ? userKr.kr : 0;

    const userHearts = heartsData.find(entry => entry.userJid === userJid);
    const hearts = userHearts ? userHearts.hearts : 0;
    const streak = userHearts ? userHearts.streak : 0;

    const marriage = marriageData.find(entry => entry.userJid === userJid || entry.partnerJid === userJid);
    const userItem = userItems.find(entry => entry.userJid === userJid) || { items: {} };

    const anillos = userItem.items.anillos || 0;
    const papeles = userItem.items.papeles || 0;
    const hongos = userItem.items.hongos || 0; 

    let message;
    if (!marriage) {
      message = 
      `╭─── ❀ *📜 Datos* ❀ ───╮  
┃ ❌ *Estado:* *Soltero(a)*  
┃ 💰 *Kr:* *${userKrBalance}*  
┃ 🎁 *Objetos:*  
┃    💍 Anillos: *${anillos}*  
┃    ✏️ Lapices: *${papeles}*  
┃    🍄 Hongos: *${hongos}*  
┃ ❤️ *Corazones:* *${hearts}*  
┃ 💖 *Racha de Amor:* *${streak} días*  
╰─────────────╯`;
    } else {
      let { userJid: proposer, partnerJid, date, groupId, surname } = marriage;

      // Si la relación no tiene apellido, asignar uno y guardarlo en marriage.json
      if (!surname) {
        surname = getRandomSurname();
        marriage.surname = surname;
        writeData(MARRIAGE_FILE_PATH, marriageData);
      }

      const marriageDate = new Date(date);
      const currentDate = new Date();
      const daysMarried = Math.floor((currentDate - marriageDate) / (1000 * 60 * 60 * 24));

      const proposerSuffix = proposer.split("@")[0].slice(-3);
      const partnerSuffix = partnerJid.split("@")[0].slice(-3);
      const relationshipCode = `${surname} ${proposerSuffix}${partnerSuffix}`;

      message = 
      `╭─── 💖 *📜 Datos* 💖 ───╮  
┃ 💍 *Estado:* *Casado(a)*  
┃ 📅 *Matrimonio:* *${marriageDate.toLocaleDateString()}*  
┃ 🗓️ *Días:* *${daysMarried}*  
┃ 💖 *Amor:* *${relationshipCode}*  
┃ 💰 *Kr:* *${userKrBalance}*  
┃ 🎁 *Objetos:*  
┃    💍 Anillos: *${anillos}*  
┃    ✏️ Lapices: *${papeles}*  
┃    🍄 Hongos: *${hongos}*   
┃ ❤️ *Corazones:* *${hearts}*  
┃ 💖 *Racha de Amor:* *${streak} días*  
╰─────────────╯`;
    }

    await sendReply(message);
  },
};