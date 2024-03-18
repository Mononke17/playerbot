// returns elo as a a number, relative to Master 0 LP
export function eloToRank(lp: number): string {
  if (lp >= 0) {
    return "Master+ " + lp + "LP";
  }
  let tier = "";
  let division = "";
  if (lp >= -400) {
    tier = "Diamond";
  } else if (lp >= -800) {
    tier = "Emerald";
  } else if (lp >= -1200) {
    tier = "Platinum";
  } else if (lp >= -1600) {
    tier = "Gold";
  } else if (lp >= -2000) {
    tier = "Silver";
  } else if (lp >= -2400) {
    tier = "Bronze";
  } else {
    tier = "Iron";
  }
  if (lp % 400 < 100) {
    division = "I";
  } else if (lp % 400 < 200) {
    division = "II";
  } else if (lp % 400 < 300) {
    division = "III";
  } else {
    division = "IV";
  }
  return tier + " " + division + " " + (100 - ((lp % 400) % 100)) + "LP";
}
