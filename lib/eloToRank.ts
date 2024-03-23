// returns ranks from an absolute elo number
export function eloToRank(lp: number): string {
  if (lp >= 2800) {
    return "Master+ " + (lp - 2800) + "LP";
  }
  let tiers = [
    "Iron",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Emerald",
    "Diamond",
  ];
  let divisions = ["I", "II", "III", "IV"];
  return (
    tiers[Math.floor(lp / 400)] +
    " " +
    divisions[Math.floor((lp % 400) / 100)] +
    " " +
    (lp % 100) +
    "LP"
  );
}
