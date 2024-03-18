//returns Rank from an elo number, that is relative to master 0 lp
export function rankToElo(lp: number, tier: string, division: string): number {
  if (tier === "GRANDMASTER" || tier === "CHALLENGER" || tier === "MASTER") {
    return lp;
  } else {
    let tiersub = 0;
    if (tier === "EMERALD") {
      tiersub = 400;
    }
    if (tier === "PLATINUM") {
      tiersub = 800;
    }
    if (tier === "GOLD") {
      tiersub = 1200;
    }
    if (tier === "SILVER") {
      tiersub = 1600;
    }
    if (tier === "BRONZE") {
      tiersub = 2000;
    }
    if (tier === "IRON") {
      tiersub = 2400;
    }
    if (division === "I") {
      tiersub += 300;
    }
    if (division === "II") {
      tiersub += 200;
    }
    if (division === "III") {
      tiersub += 100;
    }
    return 0 - tiersub + lp;
  }
}
