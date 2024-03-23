//returns elo, that is relative to IRON IV 0 lp, from a Rank.
export function rankToElo(lp: number, tier: string, division: string): number {
  if (tier === "GRANDMASTER" || tier === "CHALLENGER" || tier === "MASTER") {
    return 2800 + lp;
  } else {
    let tiers = [
      "IRON",
      "BRONZE",
      "SILVER",
      "GOLD",
      "PLATINUM",
      "EMERALD",
      "DIAMOND",
    ];
    let divisions = ["IV", "III", "II", "I"];

    return tiers.indexOf(tier) * 400 + divisions.indexOf(division) * 100 + lp;
  }
}
