import fetch from "node-fetch";
const fs = require("fs");
import * as cheerio from "cheerio";
const apikey: string = "RGAPI-9fb2fd63-d7fc-4b81-a80b-6dc6f358b298";
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
async function loadPlayerPUUIDs(playerRiotIDs: string[]) {
  let playerPUUIDs: string[] = [];
  for (let i = 0; i < playerRiotIDs.length; i++) {
    let url =
      "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" +
      playerRiotIDs[i].slice(0, playerRiotIDs[i].indexOf("#")) +
      "/" +
      playerRiotIDs[i].slice(playerRiotIDs[i].indexOf("#") + 1) +
      "?api_key=" +
      apikey;
    let PUUID = await geturlJson(url);
    playerPUUIDs.push(PUUID.puuid);
  }
  return playerPUUIDs;
}
async function geturlJson(url: string) {
  const response = await fetch(url);
  return await response.json();
}
async function geturlText(url: string) {
  const response = await fetch(url);
  return await response.text();
}
async function geturl(url: string) {
  const response = await fetch(url);
  return response; 
}
//this function takes the html body and returns the riot IDs
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
async function getPUUIDs(playerRiotIDs: string[], i: number) {
    let url =
      "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" +
      playerRiotIDs[i].slice(0, playerRiotIDs[i].indexOf("#")) +
      "/" +
      playerRiotIDs[i].slice(playerRiotIDs[i].indexOf("#") + 1) +
      "?api_key=" +
      apikey;
  let response = await geturl(url);
  let jsonresponse = await response.json();
  

  if (await response.status != 200) {
    console.log( i + " riot api response code: " + response.status);
    return await getPUUIDs(playerRiotIDs, i);
  }
  if (playerRiotIDs[i+1]) {
    return [jsonresponse.puuid].concat(await getPUUIDs(playerRiotIDs, i + 1))
  }
  return [jsonresponse.puuid];
}

async function updateDB(loadfile: string) {
  const playerNames: string[] = loadPlayerNames(loadfile);
  const playerurls: string[] = loadPlayerLinks(loadfile);
  const playerTeams: string[] = loadPlayerTeams(loadfile);
 // let playersRIOTIDs: string[][] = [];
  let playerPUUIDs: string[][] = [];
  for (let i = 0; i <= playerurls.length; i++) {
    await geturlText(playerurls[i])
      .then(async function (playerurl) {
        console.log(
          "DBUPDATE getRIOTIDS Progress: " +
            (i + 1) +
            " / " +
            playerNames.length,
        );
        playerPUUIDs.push(await getPUUIDs(getPlayerAccs(playerurl), 0));
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  console.log("writing to file...");
  let dbstring = "\n";
  for (let i = 0; i < playerNames.length; i++) {
    dbstring +=
      playerTeams[i] + "." + playerNames[i] + ":" + playerPUUIDs[i] + "\n";
  }
  fs.writeFile("DB.txt", dbstring, (err: Error) => {
    if (err) {
      console.error(err);
    } else {
      console.log("DB updated!");
    }
  });
}

const htmlfile: string = "ladders.html";
updateDB(htmlfile);
