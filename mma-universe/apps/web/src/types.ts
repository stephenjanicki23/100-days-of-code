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

/** One event of a fight's play-by-play, as published by the API. */
export interface FightEventWire {
  schemaVersion: number;
  fightId: string;
  sequence: number;
  round: number;
  timestamp: number;
  roundTime: string;
  timeRemaining: number;
  position: string;
  eventType: string;
  description: string;
  attacker?: string;
  defender?: string;
  fighterId?: string;
  technique?: string;
  target?: string;
  result?: string;
  damage?: number;
}

export interface FightSummary {
  id: string;
  divisionKey: string;
  fighterAId: string;
  fighterBId: string;
  fighterAName?: string;
  fighterBName?: string;
  winnerName?: string;
  outcome?: string;
  finishRound?: number;
  finishTime?: string;
  technique?: string;
  isTitleFight: boolean;
  /** Which belt was on the line, when one was. */
  titleType?: 'undisputed' | 'interim' | 'vacant' | 'unification';
  scheduledRounds: number;
  fightDate?: string;
}

export interface FightDetail extends FightSummary {
  divisionName: string;
  fighterA?: FighterSummary;
  fighterB?: FighterSummary;
  events: FightEventWire[];
  scorecards: { judgeName: string; rounds: { round: number; a: number; b: number }[]; totalA: number; totalB: number }[];
}

export interface VenueInfo { id: string; name: string; city: string; country: string; capacity: number; prestige: number }

export interface EventSummary {
  id: string;
  promotionId: string;
  promotion?: string;
  name: string;
  date: string;
  tier: string;
  status: string;
  venue?: VenueInfo;
  boutCount: number;
  headline?: string;
  hasTitleFight: boolean;
  attendance?: number;
  ppvBuys?: number;
  revenue?: number;
}

export interface EventDetail extends Omit<EventSummary, 'promotion'> {
  promotion?: { id: string; name: string; shortName: string };
  fights: (FightSummary & {
    divisionName: string;
    billing: string;
    fighterA?: FighterSummary;
    fighterB?: FighterSummary;
    status: string;
  })[];
}

export interface NewsArticleWire {
  id: string;
  published: string;
  headline: string;
  body: string;
  category: string;
  subjectId?: string;
}

export interface StorylineWire {
  id: string;
  kind: string;
  title: string;
  started: string;
  status: string;
  heat: number;
  participants: string[];
  participantNames: string[];
  beats: { date: string; text: string }[];
}

export interface TitleWire {
  divisionKey: string;
  divisionName: string;
  since?: string;
  defences: number;
  champion?: FighterSummary;
  interimChampion?: FighterSummary;
  lineage: { fighterId: string; name: string; from: string; to?: string; defences: number }[];
}

/* --------------------------------------------------- the 3D animation contract */

/**
 * Mirrors `@mma/sim`'s `viz/animation-map.ts`. It is copied rather than imported on purpose:
 * the renderer consumes `/fights/:id/events?format=animation` over HTTP and knows nothing
 * about the simulation package, which is the same position an Unreal or Unity client would
 * be in. If these drift, `apps/web/test/animation.test.ts` fails.
 */
export type FightPositionWire =
  | 'STANDING'
  | 'CLINCH'
  | 'CAGE_CLINCH'
  | 'TAKEDOWN_ATTEMPT'
  | 'GROUND_TOP'
  | 'GROUND_BOTTOM'
  | 'GUARD'
  | 'HALF_GUARD'
  | 'SIDE_CONTROL'
  | 'MOUNT'
  | 'BACK_CONTROL'
  | 'SCRAMBLE'
  | 'SUBMISSION_ATTEMPT'
  | 'STUNNED'
  | 'RECOVERY';

export type CameraHint =
  | 'WIDE'
  | 'BROADCAST'
  | 'CLOSE'
  | 'IMPACT'
  | 'GROUND_OVERHEAD'
  | 'CAGE_SIDE'
  | 'REPLAY'
  | 'CORNER';

export type HitReaction =
  | 'NONE'
  | 'LIGHT'
  | 'HEAVY'
  | 'STAGGER'
  | 'DROP'
  | 'BLOCK'
  | 'SLIP'
  | 'SPRAWL_DEFEND';

export interface AnimationDirective {
  clip: string;
  variant: number;
  targetState: FightPositionWire;
  camera: CameraHint;
  reaction: HitReaction;
  speed: number;
  triggersReplay: boolean;
  actorId?: string;
  reactorId?: string;
}

/** One entry of `/fights/:id/events?format=animation`. */
export interface AnimationBeatWire {
  event: FightEventWire;
  directive: AnimationDirective;
}
