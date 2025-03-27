const { version } = require("../../package.json");

exports.sayLog = (message) => {
  console.log("\x1b[36m[POCHE | TALK]\x1b[0m", message);
};

exports.inputLog = (message) => {
  console.log("\x1b[30m[POCHE | INPUT]\x1b[0m", message);
};

exports.infoLog = (message) => {
  console.log("\x1b[34m[Operacion 👻 Mashall]\x1b[0m", message);
};

exports.successLog = (message) => {
  console.log("\x1b[5m\x1b[32m[POCHE ༴༎ OM]\x1b[0m", message);
};

exports.errorLog = (message) => {
  console.log("\x1b[31m[KRAMPUS | ERROR]\x1b[0m", message);
};

exports.warningLog = (message) => {
  console.log("\x1b[33m[POCHE | ADVERTENCIA]\x1b[0m", message);
};

exports.bannerLog = () => {
  console.log(`\x1b[34m▄▄   ▄▄▄\x1b[0m`);
  console.log(`\x1b[34m ██  ██▀\x1b[0m`);
  console.log(`\x1b[34m ██▄██      ██▄████   ▄█████▄  ████▄██▄\x1b[0m`);
  console.log(`\x1b[34m █████      ██▀       ▀ ▄▄▄██  ██ ██ ██\x1b[0m`);
  console.log(`\x1b[34m ██  ██▄    ██       ▄██▀▀▀██  ██ ██ ██\x1b[0m`);
  console.log(`\x1b[34m ██   ██▄   ██       ██▄▄▄███  ██ ██ ██\x1b[0m`);
  console.log(`\x1b[34m ▀▀    ▀▀   ▀▀        ▀▀▀▀ ▀▀  ▀▀ ▀▀ ▀▀\x1b[0m`);
  console.log(`\x1b[31mby Krampus OM\x1b[0m`);
};
