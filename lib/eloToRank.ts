// returns elo relative to Master 0 LP as a a number,
export function eloToRank(lp: number): string {
  if (lp >= 0) {
    return "Master+ " + lp + "LP";
  }
  let tiers = [
    "Diamond",
    "Emerald",
    "Platinum",
    "Gold",
    "Silver",
    "Bronze",
    "Iron",
  ];
  let divisions = ["I", "II", "III", "IV"];
  return (
    tiers[Math.floor((Math.abs(lp) - 1) / 400)] +
    " " +
    divisions[Math.floor((lp % 400) / 100)] +
    " " +
    (100 - ((lp % 400) % 100)) +
    "LP"
  );
}
