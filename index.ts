const config = require("./config.json");
import { updateDB } from "./lib/updateDB";
import fs from "fs";
import { getteamsinfo } from "./lib/getteamsinfo";
const express = require("express");
const app = express();

export let DB = "";
try {
  const data = fs.readFileSync("DB.txt", "utf8");
  DB = data;
} catch (err) {
  console.error(err);
  console.log(
    'considere to generate db first using "node index.js S(ync) /path/to/ladders.html".',
  );
}

export const playeruuids: string[] = observeduuids(config.proname);
if (process.argv[2]) {
  if (process.argv[2][0] == "S") {
    console.log("updating database using " + process.argv[3] + "..");
    updateDB(process.argv[3]);
  }
} else if (playeruuids && config.apikey != "") {
  mainproc();
} else {
  console.log("Cant start, Check config.json for errors");
}

function mainproc(): void {
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
  console.error("NO ACCOUNTS FOUND IN DB FOR GIVEN PLAYERNAME");
  return [""];
}
