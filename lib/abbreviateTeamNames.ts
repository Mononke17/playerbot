export function abbreviateTeamNames(teams: string[]): string[] {
  for (let i = 0; i < teams.length; i++) {
    switch (teams[i]) {
      case "G2 Esports":
        teams[i] = "G2";
        break;
      case "Fnatic":
        teams[i] = "FNC";
        break;
      case "Team Vitality":
        teams[i] = "VIT";
        break;
      case "Team BDS":
        teams[i] = "BDS";
        break;
      case "Team Heretics":
        teams[i] = "TH";
        break;
      case "Karmine Corp":
        teams[i] = "KC";
        break;
      case "GIANTX":
        teams[i] = "GX";
        break;
      case "MAD Lions KOI":
        teams[i] = "MDK";
        break;
      case "Rogue":
        teams[i] = "RGE";
        break;
      case "SK Gaming":
        teams[i] = "SK";
        break;
      case "NNO Prime":
        teams[i] = "NNO";
        break;
      case "SK Gaming Prime":
        teams[i] = "SKP";
        break;
      case "Austrian Force willhaben":
        teams[i] = "AF";
        break;
      case "Unicorns of Love Sexy Edition":
        teams[i] = "UOL";
        break;
      case "Eintracht Spandau":
        teams[i] = "EINS";
        break;
      case "FC Schalke 04 Esports":
        teams[i] = "S04";
        break;
      case "E WIE EINFACH":
        teams[i] = "EWIE";
        break;
      case "Eintracht Frankfurt eSports":
        teams[i] = "SGE";
        break;
      case "Berlin International Gaming":
        teams[i] = "BIG";
        break;
      case "MOUZ NXT":
        teams[i] = "NXT";
        break;
      case "ZETA":
        teams[i] = "ZTA";
        break;
      case "Case ESports":
        teams[i] = "CASE";
        break;
      case "UCAM Tokiers":
        teams[i] = "UCAM";
        break;
      case "Rebels Gaming":
        teams[i] = "RBLS";
        break;
      case "Barça eSports":
        teams[i] = "BAR";
        break;
      case "Movistar KOI":
        teams[i] = "KOI";
        break;
      case "Los Heretics":
        teams[i] = "HRTS";
        break;
      case "Guasones":
        teams[i] = "GSNS";
        break;
      case "GIANTX PRIDE":
        teams[i] = "GXP";
        break;
      case "Ramboot Club":
        teams[i] = "RBT";
        break;
      case "Team BDS Academy":
        teams[i] = "BDSA";
        break;
      case "Karmine Corp Blue":
        teams[i] = "KCB";
        break;
      case "Vitality Bee":
        teams[i] = "VITB";
        break;
      case "Gentle Mates":
        teams[i] = "M8";
        break;
      case "Solary":
        teams[i] = "SLY";
        break;
      case "Team Du Sud":
        teams[i] = "TDS";
        break;
      case "Gameward":
        teams[i] = "GW";
        break;
      case "BK ROG Esports":
        teams[i] = "BKR";
        break;
      case "Aegis":
        teams[i] = "AEG";
        break;
      case "Team GO":
        teams[i] = "GO";
        break;
      case "Beşiktaş Esports":
        teams[i] = "BJK";
        break;
      case "NASR eSports Turkey":
        teams[i] = "NASR";
        break;
      case "FUT Esports":
        teams[i] = "FUT";
        break;
      case "Galakticos":
        teams[i] = "GAL";
        break;
      case "Papara SuperMassive":
        teams[i] = "SUP";
        break;
      case "BoostGate Esports":
        teams[i] = "BGT";
        break;
      case "Dark Passage":
        teams[i] = "DP";
        break;
      case "Misa Esports":
        teams[i] = "MISA";
        break;
      case "Bilibili Gaming":
        teams[i] = "BLG";
        break;
      case "JD Gaming":
        teams[i] = "JDG";
        break;
      case "Top Esports":
        teams[i] = "TES";
        break;
      case "FunPlus Phoenix":
        teams[i] = "FPX";
        break;
      case "Team WE":
        teams[i] = "WE";
        break;
      case "Oh My God":
        teams[i] = "OMG";
        break;
      case "Anyone's Legend":
        teams[i] = "AL";
        break;
      case "LNG Esports":
        teams[i] = "LNG";
        break;
      case "Weibo Gaming":
        teams[i] = "WBG";
        break;
      case "ThunderTalk Gaming":
        teams[i] = "TTG";
        break;
      case "Royal Never Give Up":
        teams[i] = "RNG";
        break;
      case "Rare Atom":
        teams[i] = "RA";
        break;
      case "LGD Gaming":
        teams[i] = "LGD";
        break;
      case "EDward Gaming":
        teams[i] = "EDG";
        break;
      case "Ultra Prime":
        teams[i] = "UP";
        break;
      case "Gen G":
        teams[i] = "GENG";
        break;
      case "T1":
        teams[i] = "T1";
        break;
      case "Hanwha Life Esports":
        teams[i] = "HLE";
        break;
      case "KT Rolster":
        teams[i] = "KT";
        break;
      case "Dplus KIA":
        teams[i] = "DP";
        break;
      case "Kwangdong Freecs":
        teams[i] = "KDF";
        break;
      case "FearX":
        teams[i] = "FX";
        break;
      case "Nongshim RedForce":
        teams[i] = "NS";
        break;
      case "DRX":
        teams[i] = "DRX";
        break;
      case "OKSavingsBank BRION":
        teams[i] = "BRO";
        break;
      case "FlyQuest":
        teams[i] = "FLY";
        break;
      case "100 Thieves":
        teams[i] = "100T";
        break;
      case "Cloud9":
        teams[i] = "C9";
        break;
      case "Team Liquid":
        teams[i] = "TL";
        break;
      case "Dignitas":
        teams[i] = "DIG";
        break;
      case "NRG":
        teams[i] = "NRG";
        break;
      case "Shopify Rebellion":
        teams[i] = "SR";
        break;
      case "Immortals":
        teams[i] = "IMT";
        break;
      default:
        teams[i] = "";
        break;
    }
  }
  return teams;
}
