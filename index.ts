import { updateDB } from "./lib/updateDB";
import fs from "fs";
import { getteamsinfo } from "./lib/getteamsinfo";

const express = require("express");
const app = express();
const config = require("./config.json");

export let DB = "";
try {
  const data = fs.readFileSync("DB.txt", "utf8");
  DB = data;
} catch (err) {
  console.error(err);
  console.log(
    'maybe generate db first using "node index.js S(ync) /path/to/ladders.html".',
  );
}
export const playeruuids: string[] = observeduuids(config.proname);

if (process.argv.length < 3) {
  if (playeruuids && config.apikey != "") {
    startserver();
  } else {
    console.log("Cant start, Check config.json for errors");
  }
} else if (
  process.argv.length == 4 &&
  (process.argv[2] == "sync" || process.argv[2] == "s")
) {
  console.log("updating database using " + process.argv[3] + "..");
  updateDB(process.argv[3]);
} else {
  console.log("ERROR: Invalid arguments given.");
}

function startserver(): void {
  app.get("/players", async (req: any, res: any) => {
    res.send(await getteamsinfo());
  });

  app.listen(config.port, () => {
    console.log("server started");
  });
}

function observeduuids(proname: string): string[] {
  let accs = DB.match(new RegExp("(?<=" + proname + ":).*"));
  if (accs != null) {
    return accs[0].split(",");
  }
  if (!process.argv[2]) {
    console.error("NO ACCOUNTS FOUND IN DB FOR GIVEN PLAYERNAME");
  }
  return [""];
}
