//returns elo from a Rank, that is relative to master 0 lp
export function rankToElo(lp: number, tier: string, division: string): number {
  if (tier === "GRANDMASTER" || tier === "CHALLENGER" || tier === "MASTER") {
    return lp;
  } else {
    let tiers = ["EMERALD", "PLATINUM", "GOLD", "SILVER", "BRONZE", "IRON"];
    let tiersubstraction = (tiers.indexOf(tier) + 1) * 400;
    return 0 - tiersubstraction + lp;
  }
}
