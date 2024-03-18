import fetch from "node-fetch";
import * as cheerio from "cheerio";
const fs = require("fs");
const config = require("./../config.json");
export async function updateDB(loadfile: string) {
  const playerNames: string[] = loadPlayerNames(loadfile);
  const playerurls: string[] = loadPlayerLinks(loadfile);
  const playerTeams: string[] = loadPlayerTeams(loadfile);
  let errors: string = "";
  let log: string = "";
  let playerPUUIDs: string[][] = [];
  for (let i = 0; i <= playerurls.length; i++) {
    await geturlText(playerurls[i])
      .then(async function (playerurl) {
        console.log(
          "DBUPDATE Progress: " + (i + 1) + " / " + playerNames.length,
        );
        playerPUUIDs.push(await getPUUIDs(getPlayerAccs(playerurl)));
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  console.log("writing to file...");
  let dbstring = "";
  for (let i = 0; i < playerNames.length; i++) {
    dbstring +=
      playerTeams[i] + "." + playerNames[i] + ":" + playerPUUIDs[i] + "\n";
  }
  fs.writeFile("./../DB.txt", dbstring, (err: Error) => {
    if (err) {
      console.error(err);
    } else {
      if (errors == "") {
        console.log("DB updated without error!");
      } else {
        console.log(
          "DB updated with some error, check logs, if enabled for errors. INFO: Some amount of 404 errors can be safely ignored, that just means someone namechanged his account and lolpros.gg didnt catch up yet ",
        );
      }
    }
  });
  if (config.logging) {
    fs.writeFile("./../dblogs/errors.txt", errors, (err: Error) => {
      if (err) {
        console.error(err);
      } else {
        console.log("errors written, check dblogs for debug");
      }
    });
    fs.writeFile("./../dblogs/log.txt", log, (err: Error) => {
      if (err) {
        console.error(err);
      } else {
        console.log("logs written, check dblogs for debug");
      }
    });
  }
  function loadPlayerNames(fileInputPath: string): string[] {
    try {
      const data = fs.readFileSync(fileInputPath, "utf8");
      let playernames: string[] | null = data.match(
        /(.+)(?=\n<https:\/\/lolpros\.gg\/player\/)/g,
      );
      if (playernames != null) {
        return playernames;
      } else {
        console.log(
          "no players found in input file, did you input the right file?",
        );
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  }
  function loadPlayerLinks(fileInputPath: string): string[] {
    try {
      const data = fs.readFileSync(fileInputPath, "utf8");
      let playerlinks: string[] | null = data.match(
        /https:\/\/lolpros\.gg\/player\/[^>]+/g,
      );
      if (playerlinks != null) {
        return playerlinks;
      } else {
        console.log(
          "no playerlinks found in input file, did you input the right file?",
        );
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  }
  function loadPlayerTeams(fileInputPath: string): string[] {
    try {
      const data = fs.readFileSync(fileInputPath, "utf8");
      let playerTeams: string[] | null = data.match(
        /((?<=\d \t).*(?= |\n<))|(?<=\d \t)-/g,
      );

      if (playerTeams != null) {
        for (let i = 0; i < playerTeams.length; i++) {
          if (playerTeams[i] === "-") {
            playerTeams[i] = "";
          }
          if (playerTeams[i] == "Vitality.Bee") {
            playerTeams[i] = "Vitality Bee";
          }
          if (playerTeams[i] == "Gen.G") {
            playerTeams[i] = "Gen G";
          }
          if (playerTeams[i].includes(".")) {
            playerTeams[i] = "";
          }
        }
        return playerTeams;
      } else {
        console.log(
          "no playerTeams found in input file, did you input the right file?",
        );
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  }
  async function geturlText(url: string) {
    const response = await fetch(url);
    return await response.text();
  }

  function getPlayerAccs(content: string): string[] {
    const data = cheerio.load(content);
    let results = data(".summoner-name.hint--top").toString();
    let playeraccs: string[] | null;
    if (results.length === 0) {
      results = data(".summoner-name").first().toString();
      playeraccs = results.match(/(?<=>)[^=]+?#.{3,5}(?=<)/g);
    } else {
      playeraccs = results.match(/(?<=aria-label=").+?#.{3,5}(?=")/g);
    }
    if (playeraccs != null) return playeraccs;
    return [];
  }
  async function getPUUIDs(playerRiotIDs: string[]): Promise<string[]> {
    let puuids: string[] = [];
    let i = 0;
    while (i < playerRiotIDs.length) {
      let url =
        "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" +
        playerRiotIDs[i].slice(0, playerRiotIDs[i].indexOf("#")) +
        "/" +
        playerRiotIDs[i].slice(playerRiotIDs[i].indexOf("#") + 1) +
        "?api_key=" +
        config.apikey;
      let response = await geturl(url);
      let jsonresponse = await response.json();

      if (response.status != 429) {
        if (response.status != 200) {
          errors +=
            response.status + " " + playerRiotIDs[i] + "\n" + url + "\n";
          puuids.push("");
          i++;
        } else {
          log += jsonresponse.puuid + "," + playerRiotIDs[i] + "\n";
          puuids.push(jsonresponse.puuid);
          i++;
        }
      }
    }
    return puuids;
  }
}

export async function geturl(url: string) {
  const response = await fetch(url);
  return response;
}
