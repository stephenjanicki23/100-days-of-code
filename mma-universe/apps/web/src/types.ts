/** Wire types mirroring the API's read model (`apps/api/src/views.ts`). */

export interface FighterSummary {
  id: string;
  name: string;
  nickname?: string;
  record: string;
  divisionKey: string;
  divisionName: string;
  age: number;
  nationality: string;
  campId?: string;
  campName?: string;
  promotionId?: string;
  currentAbility: number;
  tier: string;
  primaryStyle: string;
  status: string;
  popularity: number;
  rank?: number;
}

export interface FighterProfile extends FighterSummary {
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: string;
  homeRegion: string;
  heightIn: number;
  reachIn: number;
  stance: string;
  weightLimitLbs: number;
  totalFights: number;
  recordDetail: Record<string, number>;
  career: Record<string, number | string | undefined>;
  condition: {
    fatigue: number;
    sharpness: number;
    weightManagement: number;
    wearAndTear: number;
    injuries: { label: string; severity: string; region: string; expectedReturn: string }[];
  };
  training: { intensity: string; focus: string[] };
  style: {
    primary: string;
    secondary: string;
    description: string;
    strength: { label: string; rating: number };
    weakness: { label: string; rating: number };
    signature: { label: string; rating: number };
    tendencies: Record<string, number>;
  };
  facets: Record<string, number>;
  attributes: { key: string; label: string; group: string; value: number }[];
  scouting: { currentAbility: number; potentialAbility: number; fulfilment: number; seedArchetype: string };
  camp?: { id: string; name: string; reputation: number };
  promotion?: { id: string; name: string; shortName: string };
  contract?: { fightsRemaining: number; fightsTotal: number; expiresDate: string; baseShow: number; winBonus: number };
  development: { date: string; currentAbility: number; potentialAbility: number; age: number }[];
}

export interface CampSummary {
  id: string;
  name: string;
  city: string;
  country: string;
  region: string;
  foundedYear: number;
  reputation: number;
  peakReputation: number;
  status: string;
  capacity: number;
  rosterSize: number;
  bestFighterAbility: number;
  trainingQuality: number;
  specialisations: { discipline: string; disciplineKey: string; tier: number; multiplier: number; bonusPercent: number }[];
}

export interface CampProfile extends CampSummary {
  facilities: { training: number; medical: number; sportsScience: number; recovery: number };
  culture: { discipline: number; intensity: number; cohesion: number };
  history: { titlesWon: number; rankedFighterPeak: number; fightersDeveloped: number };
  headCoachId?: string;
  coaches: { id: string; name: string; role: string; discipline: string; ability: number; manManagement: number; reputation: number }[];
  roster: FighterSummary[];
}

export interface DivisionInfo {
  key: string;
  name: string;
  sex: string;
  weightLimitLbs: number;
  order: number;
  fighters: number;
}

export interface RankingView {
  divisionKey: string;
  divisionName: string;
  weightLimitLbs: number;
  sex: string;
  updated: string;
  entries: { rank: number; previousRank?: number; points: number; movement: number; fighter: FighterSummary }[];
}

export interface SimulationState {
  seed: string;
  startDate: string;
  currentDate: string;
  day: number;
  week: number;
  counts: {
    fighters: number;
    activeFighters: number;
    injured: number;
    camps: number;
    coaches: number;
    promotions: number;
    divisions: number;
  };
}

export interface WorldEvent {
  type: string;
  date: string;
  subjectId?: string;
  summary: string;
}

export interface Champion {
  divisionKey: string;
  divisionName: string;
  fighter: FighterSummary;
  style: string;
}

export interface PromotionInfo {
  id: string;
  name: string;
  shortName: string;
  tier: string;
  prestige: number;
  country: string;
  divisionKeys: string[];
  rosterSize: number;
}

export interface FighterList {
  total: number;
  limit: number;
  offset: number;
  items: FighterSummary[];
}
