const config = require("./../config.json");
import { geturl } from "./updateDB";
import { abbreviateTeamNames } from "./abbreviateTeamNames";
import { eloToRank } from "./eloToRank";
import { rankToElo } from "./rankToElo";
import { playeruuids, DB } from "./../.";

export async function getteamsinfo(): Promise<string> {
  let ingame;
  for (let i = 0; i < playeruuids.length; i++) {
    let url =
      "https://euw1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/" +
      playeruuids[i] +
      "?api_key=" +
      config.apikey;
    while (1) {
      let response = await geturl(url);
      //if (response.status)
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
  //compute average rank of blue and redside
  let redelo = 0;
  let blueelo = 0;
  let numberOfRankedPlayersBlueSide = 5;
  let numberOfRankedPlayersRedSide = 5;
  for (let i = 0; i < 10; i++) {
    let url =
      "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
      ingame.participants[i].summonerId +
      "?api_key=" +
      config.apikey;
    let rank;
    while (1) {
      let response = await geturl(url);
      if (response.status == 200) {
        rank = await response.json();
      }
      if (response.status != 429) {
        break;
      }
    }
    //soloqindex is 2, if player is unranked in soloq
    let soloqindex = 0;
    if (rank.length == 0) {
      soloqindex = 2;
    }
    if (rank.length == 1) {
      if (rank[0].queueType == "RANKED_SOLO_5x5") {
        soloqindex = 0;
      } else {
        soloqindex = 2;
      }
    }
    if (rank.length === 2) {
      if (rank[0].queueType == "RANKED_SOLO_5x5") {
        soloqindex = 0;
      } else {
        soloqindex = 1;
      }
    }
    if (soloqindex == 2) {
      if (i < 5) {
        numberOfRankedPlayersBlueSide--;
      } else {
        numberOfRankedPlayersRedSide--;
      }
    } else {
      if (i < 5) {
        blueelo += rankToElo(
          rank[soloqindex].leaguePoints,
          rank[soloqindex].tier,
          rank[soloqindex].rank,
        );
      } else {
        redelo += rankToElo(
          rank[soloqindex].leaguePoints,
          rank[soloqindex].tier,
          rank[soloqindex].rank,
        );
      }
    }
  }
  redelo = Math.floor(redelo / numberOfRankedPlayersRedSide);
  blueelo = Math.floor(blueelo / numberOfRankedPlayersBlueSide);

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
    if (i == 5) {
      returnstring += "Average Elo: " + eloToRank(blueelo) + " | Red Team: ";
    }
    if (names[i] != "") {
      returnstring += champions[i] + " = " + teams[i] + " " + names[i] + ", ";
    }
  }
  returnstring += "Average Elo: " + eloToRank(redelo);
  return returnstring;
}
