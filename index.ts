const config = {
  apikey: "RGAPI-d420e53b-a22b-4827-84e8-112ada3b4394", // insert your Riot-Api Key here.
  proname: "Superelchi", // lolpros.gg name of the player to be observed.
  debug: false, // verbose output and logging, not fully implemented yet (xdd)
  teamAbbreviations: true, // will produce "G2" instead of "G2 Esports", but Minor Region Teams, outside of EU and ERL DIV Teams wont be displayed
};
import { updateDB, geturl } from "./updateDB";
import { abbreviateTeamNames } from "./abbreviateTeamNames";
import fs from "fs";
const express = require("express");
const app = express();
const port = 3000;
let DB = "";
try {
  const data = fs.readFileSync("DB.txt", "utf8");
  DB = data;
} catch (err) {
  console.error(err);
  console.log(
    'considere to generate db first using "node index.js S(ync) /path/to/ladders.html".',
  );
}
const playeruuids: string[] = getplayeruuids(config.proname);
if (process.argv[2]) {
  if (process.argv[2][0] == "S") {
    console.log("updating database using " + process.argv[3] + "..");
    updateDB({ loadfile: process.argv[3], apikey: config.apikey });
  }
} else if (playeruuids) {
  mainproc();
}

//(?<=\d+\s{2}).*?(?=\s<https:\/\/lolpros\.gg\/team|$|\s\s)

function mainproc(): void {
  app.get("/players", async (req: any, res: any) => {
    res.send(await getteamsinfo());
  });

  app.listen(port, () => {
    console.log("started playerbot server");
  });
}
function getplayeruuids(proname: string): string[] {
  let accs = DB.match(new RegExp("(?<=" + proname + ":).*"));
  if (accs != null) {
    return accs[0].split(",");
  }
  console.error("NO ACCOUNTS FOUND IN DB FOR GIVEN PLAYERNAME");
  return [""];
}

async function getteamsinfo(): Promise<string> {
  let ingame;
  for (let i = 0; i < playeruuids.length; i++) {
    let url =
      "https://euw1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/" +
      playeruuids[i] +
      "?api_key=" +
      config.apikey;
    let k = 0;
    while (1) {
      let response = await geturl(url);
      if (response.status)
        if (response.status == 200) {
          ingame = await response.json();
        }
      if (response.status != 429) {
        break;
      }
    }
  }
  if (!ingame) {
    return "ERROR";
  }
  let teams: string[] = [];
  let names: string[] = [];
  let champions: string[] = [];
  for (let i = 0; i < 10; i++) {
    let name = DB.match(
      new RegExp("(?<=\\.).*(?=:.*" + ingame.participants[i].puuid + ")"),
    );
    if (name != null) {
      names.push(name[0]);
      let team = DB.match(new RegExp(".*(?=\\." + name[0] + ")"));
      if (team != null) {
        teams.push(team[0]);
      } else {
        teams.push("");
      }
    } else {
      names.push("");
      teams.push("");
    }
    let url =
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/" +
      ingame.participants[i].championId +
      ".json";
    let response = await geturl(url);
    let responsejson = await response.json();
    champions.push(responsejson.name);
  }
  if (config.teamAbbreviations) {
    teams = abbreviateTeamNames(teams);
  }
  let returnstring: string = "Blue Team: ";
  for (let i = 0; i < 10; i++) {
    if (names[i] != "") {
      if (i == 5) {
        returnstring += " | Red Team: ";
      }
      returnstring += teams[i] + " " + names[i] + " (" + champions[i] + ")";
      if (i != 4 && i != 8) {
        returnstring += ", ";
      }
    }
  }

  return returnstring;
}
