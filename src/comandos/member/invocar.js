const fs = require("fs");
const path = require("path");
const { PREFIX } = require("../../krampus");

const userPokemonsFilePath = path.resolve(process.cwd(), "assets/userPokemons.json");

const pokemonImagenes = {
  "pichu": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/172.png",
  "pikachu": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  "raichu": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png",
  "pichu_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/172.png",
  "pikachu_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
  "raichu_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/26.png",
  
  "bulbasaur": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  "ivysaur": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  "venusaur": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  "bulbasaur_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
  "ivysaur_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png",
  "venusaur_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/3.png",
  
  "charmander": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  "charmeleon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
  "charizard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  "charmander_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png",
  "charmeleon_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/5.png",
  "charizard_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png",
  
  "squirtle": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  "wartortle": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
  "blastoise": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
  "squirtle_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/7.png",
  "wartortle_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/8.png",
  "blastoise_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/9.png",

  "caterpie": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
  "metapod": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
  "butterfree": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
  "caterpie_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10.png",
  "metapod_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/11.png",
  "butterfree_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/12.png",

  "weedle": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png",
  "kakuna": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
  "beedrill": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png",
  "weedle_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/13.png",
  "kakuna_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/14.png",
  "beedrill_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/15.png",

  "dratini": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
  "dragonair": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png",
  "dragonite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
  "dratini_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/147.png",
  "dragonair_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/148.png",
  "dragonite_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/149.png",

  "larvitar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/246.png",
  "pupitar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/247.png",
  "tyranitar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/248.png",
  "larvitar_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/246.png",
  "pupitar_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/247.png",
  "tyranitar_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/248.png",

"pidgey": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",  
"pidgeotto": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png",  
"pidgeot": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",  
"pidgey_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/16.png",  
"pidgeotto_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/17.png",  
"pidgeot_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/18.png",

"rattata": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",  
"raticate": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png",  
"rattata_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/19.png",  
"raticate_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/20.png",

"spearow": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png",  
"fearow": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png",  
"spearow_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/21.png",  
"fearow_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/22.png",

"ekans": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png",  
"arbok": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png",  
"ekans_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/23.png",  
"arbok_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/24.png",

"sandshrew": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png",  
"sandslash": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png",  
"sandshrew_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/27.png",  
"sandslash_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/28.png",

"sandshrew_alola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10102.png",  
"sandslash_alola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10103.png",  
"sandshrew_alola_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10102.png",  
"sandslash_alola_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10103.png",

"nidoran♀": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png",  
"nidorina": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png",  
"nidoqueen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png",  
"nidoran♀_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/29.png",  
"nidorina_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/30.png",  
"nidoqueen_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/31.png",

"vulpix": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png",  
"ninetales": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png",  
"vulpix_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/37.png",  
"ninetales_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/38.png",

"vulpix_alola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10100.png",  
"ninetales_alola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10101.png",  
"vulpix_alola_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10100.png",  
"ninetales_alola_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10101.png",

"zubat": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png",  
"golbat": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png",  
"zubat_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/41.png",  
"golbat_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/42.png",

"oddish": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png",  
"gloom": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png",  
"vileplume": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png",  
"oddish_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/43.png",  
"gloom_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/44.png",  
"vileplume_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/45.png",

"paras": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png",  
"parasect": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/47.png",  
"paras_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/46.png",  
"parasect_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/47.png",

"venonat": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/48.png",  
"venomoth": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png",  
"venonat_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/48.png",  
"venomoth_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/49.png",

"diglett": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png",  
"dugtrio": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/51.png",  
"diglett_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/50.png",  
"dugtrio_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/51.png",

"meowth": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png",  
"persian": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/53.png",  
"meowth_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/52.png",  
"persian_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/53.png",

"meowth_alola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10104.png",  
"persian_alola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10105.png",  
"meowth_alola_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10104.png",  
"persian_alola_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10105.png",

"psyduck": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png",  
"golduck": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png",  
"psyduck_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/54.png",  
"golduck_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/55.png",

"mankey": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png",  
"primeape": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png",  
"annihilape": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/979.png",  
"mankey_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/56.png",  
"primeape_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/57.png",  
"annihilape_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/979.png",

"growlithe": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png",  
"arcanine": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png",  
"growlithe_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/58.png",  
"arcanine_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/59.png",

"growlithe_hisui": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10230.png",  
"arcanine_hisui": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10231.png",  
"growlithe_hisui_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10230.png",  
"arcanine_hisui_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10231.png",

"poliwag": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png",  
"poliwhirl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png",  
"poliwrath": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png",  
"politoed": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/186.png",  
"poliwag_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/60.png",  
"poliwhirl_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/61.png",  
"poliwrath_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/62.png",  
"politoed_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/186.png",

"abra": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png",  
"kadabra": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png",  
"alakazam": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png",  
"abra_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/63.png",  
"kadabra_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/64.png",  
"alakazam_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/65.png",

"alakazam_mega": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10065.png",  
"alakazam_mega_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10065.png",

"machop": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png",  
"machoke": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/67.png",  
"machamp": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png",  
"machop_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/66.png",  
"machoke_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/67.png",  
"machamp_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/68.png",

"bellsprout": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/69.png",  
"weepinbell": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/70.png",  
"victreebel": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/71.png",  
"bellsprout_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/69.png",  
"weepinbell_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/70.png",  
"victreebel_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/71.png",

"tentacool": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png",  
"tentacruel": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png",  
"tentacool_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/72.png",  
"tentacruel_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/73.png",

"geodude": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png",  
"graveler": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/75.png",  
"golem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png",  
"geodude_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/74.png",  
"graveler_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/75.png",  
"golem_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/76.png",

"geodude_alola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10106.png",  
"graveler_alola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10107.png",  
"golem_alola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10108.png",  
"geodude_alola_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10106.png",  
"graveler_alola_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10107.png",  
"golem_alola_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10108.png",

"ponyta": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png",  
"rapidash": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png",  
"ponyta_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/77.png",  
"rapidash_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/78.png",

"ponyta_galar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10109.png",  
"rapidash_galar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10110.png",  
"ponyta_galar_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10109.png",  
"rapidash_galar_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10110.png",

"slowpoke": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/79.png",  
"slowbro": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png",  
"slowking": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/199.png",  
"slowbro_mega": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10080.png",  
"slowpoke_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/79.png",  
"slowbro_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/80.png",  
"slowking_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/199.png",  
"slowbro_mega_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10080.png",

"slowpoke_galar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10111.png",  
"slowbro_galar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10112.png",  
"slowpoke_galar_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10111.png",  
"slowbro_galar_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10112.png",

"magnemite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png",  
"magneton": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/82.png",  
"magnezone": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/462.png",  
"magnemite_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/81.png",  
"magneton_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/82.png",  
"magnezone_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/462.png",

"doduo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png",  
"dodrio": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png",  
"doduo_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/84.png",  
"dodrio_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/85.png",

"seel": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/86.png",  
"dewgong": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png",  
"seel_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/86.png",  
"dewgong_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/87.png",

"grimer": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/88.png",  
"muk": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png",  
"grimer_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/88.png",  
"muk_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/89.png",

"grimer_alola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10114.png",  
"muk_alola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10115.png",  
"grimer_alola_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10114.png",  
"muk_alola_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10115.png",

"shellder": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/90.png",  
"cloyster": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/91.png",  
"shellder_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/90.png",  
"cloyster_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/91.png",

"gastly": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png",  
"haunter": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png",  
"gengar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",  
"gastly_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/92.png",  
"haunter_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/93.png",  
"gengar_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/94.png",

"gengar_mega": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10092.png",  
"gengar_mega_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10092.png",

"drowzee": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/96.png",  
"hypno": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/97.png",  
"drowzee_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/96.png",  
"hypno_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/97.png",

"krabby": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/98.png",  
"kingler": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/99.png",  
"krabby_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/98.png",  
"kingler_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/99.png",

"kingler_gmax": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10216.png",  
"kingler_gmax_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10216.png",

"voltorb": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png",  
"electrode": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/101.png",  
"voltorb_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/100.png",  
"electrode_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/101.png",

"voltorb_hisui": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10219.png",  
"electrode_hisui": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10220.png",  
"voltorb_hisui_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10219.png",  
"electrode_hisui_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10220.png",

"exeggcute": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/102.png",  
"exeggutor": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png",  
"exeggcute_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/102.png",  
"exeggutor_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/103.png",

"exeggutor_alola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10116.png",  
"exeggutor_alola_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10116.png",

"cubone": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png",  
"marowak": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/105.png",  
"cubone_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/104.png",  
"marowak_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/105.png",

"marowak_alola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10117.png",  
"marowak_alola_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10117.png",

"tyrogue": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/236.png",  
"hitmonlee": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png",  
"hitmonchan": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/107.png",  
"hitmontop": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/237.png",  
"tyrogue_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/236.png",  
"hitmonlee_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/106.png",  
"hitmonchan_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/107.png",  
"hitmontop_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/237.png",

"koffing": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/109.png",  
"weezing": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png",  
"koffing_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/109.png",  
"weezing_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/110.png",

"weezing_galar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10186.png",  
"weezing_galar_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10186.png",

"rhyhorn": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png",  
"rhydon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png",  
"rhyperior": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/464.png",  
"rhyhorn_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/111.png",  
"rhydon_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/112.png",  
"rhyperior_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/464.png",

"horsea": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/116.png",  
"seadra": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/117.png",  
"horsea_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/116.png",  
"seadra_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/117.png",

"kingdra": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/230.png",  
"kingdra_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/230.png",

"goldeen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/118.png",  
"seaking": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/119.png",  
"goldeen_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/118.png",  
"seaking_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/119.png",

"staryu": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png",  
"starmie": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png",  
"staryu_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/120.png",  
"starmie_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/121.png",

"magikarp": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png",  
"gyarados": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png",  
"magikarp_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/129.png",  
"gyarados_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/130.png",

"gyarados_mega": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/mega/130.png",  
"gyarados_mega_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/mega/130.png",

"eevee": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",  
"vaporeon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png",  
"jolteon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png",  
"flareon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png",  
"espeon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/196.png",  
"umbreon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/197.png",  
"leafeon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/470.png",  
"glaceon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/471.png",  
"sylveon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/700.png",  
"eevee_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/133.png",  
"vaporeon_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/134.png",  
"jolteon_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/135.png",  
"flareon_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/136.png",  
"espeon_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/196.png",  
"umbreon_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/197.png",  
"leafeon_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/470.png",  
"glaceon_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/471.png",  
"sylveon_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/700.png",

"omanyte": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/138.png",  
"omastar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",  
"omanyte_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/138.png",  
"omastar_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/139.png",

"kabuto": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/140.png",  
"kabutops": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/141.png",  
"kabuto_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/140.png",  
"kabutops_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/141.png",

"dratini": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",  
"dragonair": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png",  
"dragonite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",  
"dratini_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/147.png",  
"dragonair_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/148.png",  
"dragonite_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/149.png",

"chikorita": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png",  
"bayleef": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/153.png",  
"meganium": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/154.png",  
"chikorita_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/152.png",  
"bayleef_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/153.png",  
"meganium_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/154.png",

"cyndaquil": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png",  
"quilava": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/156.png",  
"typhlosion": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/157.png",  
"cyndaquil_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/155.png",  
"quilava_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/156.png",  
"typhlosion_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/157.png",

"totodile": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png",  
"croconaw": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/159.png",  
"feraligatr": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/160.png",  
"totodile_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/158.png",  
"croconaw_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/159.png",  
"feraligatr_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/160.png",

"sentret": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/161.png",  
"furret": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/162.png",  
"sentret_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/161.png",  
"furret_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/162.png",

"hoothoot": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/163.png",  
"noctowl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/164.png",  
"hoothoot_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/163.png",  
"noctowl_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/164.png",

"ledyba": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/165.png",  
"ledian": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/166.png",  
"ledyba_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/165.png",  
"ledian_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/166.png",

"spinarak": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/167.png",  
"ariados": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/168.png",  
"spinarak_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/167.png",  
"ariados_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/168.png",

"chingling": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/433.png",  
"chimecho": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/434.png",  
"chingling_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/433.png",  
"chimecho_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/434.png",

"mareep": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/179.png",  
"flaaffy": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/180.png",  
"ampharos": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/181.png",  
"mareep_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/179.png",  
"flaaffy_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/180.png",  
"ampharos_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/181.png",

"hoppip": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/187.png",  
"skiploom": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/188.png",  
"jumpluff": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/189.png",  
"hoppip_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/187.png",  
"skiploom_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/188.png",  
"jumpluff_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/189.png",

"sunkern": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/191.png",  
"sunflora": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/192.png",  
"sunkern_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/191.png",  
"sunflora_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/192.png",

"wooper": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/194.png",  
"quagsire": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/195.png",  
"wooper_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/194.png",  
"quagsire_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/195.png",

"pineco": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/204.png",  
"forretress": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/205.png",  
"pineco_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/204.png",  
"forretress_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/205.png",

"teddiursa": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/216.png",  
"ursaring": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/217.png",  
"teddiursa_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/216.png",  
"ursaring_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/217.png",

"slugma": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/218.png",  
"magcargo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/219.png",  
"slugma_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/218.png",  
"magcargo_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/219.png",

"swinub": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/220.png",  
"piloswine": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/221.png",  
"mamoswine": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/473.png",  
"swinub_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/220.png",  
"piloswine_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/221.png",  
"mamoswine_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/473.png",

"remoraid": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/223.png",  
"octillery": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/224.png",  
"remoraid_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/223.png",  
"octillery_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/224.png",

"larvitar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/246.png",  
"pupitar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/247.png",  
"tyranitar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/248.png",  
"larvitar_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/246.png",  
"pupitar_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/247.png",  
"tyranitar_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/248.png",


  "venusaur_mega": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/mega/3.png",
  "charizard_mega_x": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/mega/6-x.png",
  "charizard_mega_y": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/mega/6-y.png",
  "blastoise_mega": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/mega/9.png",
  "alakazam_mega": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/mega/65.png",
  "gengar_mega": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/mega/94.png",
  "slowbro_mega": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/mega/80.png",
  "gyarados_mega": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/mega/130.png",
  "ampharos_mega": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/mega/181.png",
  "tyranitar_mega": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/mega/248.png",
  
  
  "articuno": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png",
  "zapdos": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png",
  "moltres": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png",
  "mewtwo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
  "mew": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png",


  "suicune": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/245.png",
  "entei": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/244.png",
  "raikou": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/243.png",
  "lugia": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png",
  "ho-oh": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png",
  "celebi": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/251.png",


  "regirock": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/377.png",
  "regice": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/378.png",
  "registeel": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/379.png",
  "latias": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/380.png",
  "latios": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/381.png",
  "kyogre": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/382.png",
  "groudon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/383.png",
  "rayquaza": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png",
  "jirachi": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/385.png",
  "deoxys": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/386.png",


  "dialga": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/483.png",
  "palkia": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/484.png",
  "giratina": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/487.png",
  "arceus": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png",
  "uxie": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/480.png",
  "azelf": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/481.png",
  "mesprit": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/482.png",
  "darkrai": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/491.png",
  "shaymin": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/492.png",


  "reshiram": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/643.png",
  "zekrom": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/644.png",
  "kyurem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/646.png",
  "cobalion": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/638.png",
  "terrakion": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/639.png",

  "virizion": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/640.png",
  "tornadus": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/641.png",
  "thundurus": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/642.png",
  "landorus": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/645.png",
  "victini": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/494.png",


  "xerneas": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/716.png",
  "yveltal": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/717.png",
  "zygarde": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/718.png",
  "diancie": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/719.png",
  "hoopa": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/720.png",
  "volcanion": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/721.png",


  "solgaleo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/791.png",
  "lunala": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/792.png",
  "necrozma": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/800.png",
  "tapu_lele": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/786.png",
  "tapu_bulu": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/787.png",
  "tapu_fini": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/788.png",
  "cosmog": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/789.png",
  "magearna": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/801.png",
  "marshadow": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/802.png",


  "zacian": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/888.png",
  "zamazenta": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/889.png",
  "eternatus": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/890.png",
  "kubfu": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/891.png",
  "urshifu": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/892.png",


  "koraidon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1000.png",
  "miraidon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1001.png",
  "chien-pao": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1002.png",
  "chi-yu": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1003.png",
  "ting-lu": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1004.png",
  "wo-chien": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1005.png",
  "ruinous_quartet": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1006.png",
  "slither_wing": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1007.png",
  "iron_leaves": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1008.png",
  "walking_wake": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1009.png",
  "iron_crown": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1010.png",
  
// LEGENDARIOS
  
"mewtwo_mega_x": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10000.png",
  "mewtwo_mega_y": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10001.png",
  "kyogre_prima": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10007.png",
  "groudon_prima": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10008.png",
  "rayquaza_mega": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10009.png",
  "giratina_forma_alterna": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/487.png",
  "giratina_forma_origen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10010.png",
  "dialga_temporal": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10011.png",
  "palkia_espacial": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10012.png",
  "kyurem_negro": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10013.png",
  "kyurem_blanco": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10014.png",
  "hoopa_unbound": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10019.png",
  "zygarde_10%": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10145.png",
  "zygarde_50%": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/718.png",
  "zygarde_completo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10146.png",
  "zacian_corona": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10147.png",
  "zamazenta_corona": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10148.png",
  "eternatus_eterno": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10149.png",
  "urshifu_estilo_uno": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10150.png",
  "urshifu_estilo_dos": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10151.png",
  "calyrex_glacial": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10152.png",
  "calyrex_sombrío": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10153.png",
  "koraidon_combativo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10154.png",
  "miraidon_tecnológico": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10155.png"

};

const readData = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return {};  // Si hay un error, devolvemos un objeto vacío
  }
};

module.exports = {
  name: "invocar",
  description: "Invoca un Pokémon que has comprado.",
  commands: ["invocar"],
  usage: `${PREFIX}invocar <pokemon>`,
  handle: async ({ sendReply, args, userJid, remoteJid, socket, message }) => {
    const pokemon = args[0]?.toLowerCase();
    if (!pokemon) {
      await sendReply(`❌ Debes especificar un Pokémon para invocar. Ejemplo: *${PREFIX}invocar pichu*`);
      return;
    }

    let userPokemons = readData(userPokemonsFilePath);

    // Verificar si el usuario ha comprado el Pokémon
    if (!userPokemons[userJid] || !userPokemons[userJid].includes(pokemon)) {
      await sendReply(`❌ No tienes a *${pokemon}* en tu colección. ¿Seguro que lo compraste?`);
      return;
    }

    const imagenURL = pokemonImagenes[pokemon];  // Obtener la imagen del Pokémon

    if (!imagenURL) {
      await sendReply(`❌ No se pudo encontrar la imagen del Pokémon *${pokemon}*.`);
      return;
    }

    // Enviar la imagen correspondiente del Pokémon respondiendo al comentario
    try {
      await socket.sendMessage(remoteJid, {
        image: { url: imagenURL },
        caption: `🎉 ¡@${userJid.split('@')[0]} ha invocado a *${pokemon}*!`, // Usar el número de teléfono del usuario para etiquetarlo
        mentions: [userJid], // Aquí estamos mencionando al usuario que ejecutó el comando
        quoted: message, // Esto hace que se responda al comentario original
      });
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
      await sendReply("❌ Ocurrió un error al invocar tu Pokémon.");
    }
  }
};