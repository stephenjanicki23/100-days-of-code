/** Promotions, contracts and rankings (brief §2, §24, §25). */

import type { SimDate } from '../core/time.ts';

export type PromotionTier = 'global' | 'regional' | 'developmental';

export interface Promotion {
  readonly id: string;
  name: string;
  shortName: string;
  tier: PromotionTier;
  country: string;
  readonly foundedYear: number;
  /** 0-100. Drives purse size, media reach and which fighters will sign. */
  prestige: number;
  /** Division keys this promotion operates. Regionals run a subset. */
  divisionKeys: string[];
  /** Ranked positions maintained per division; regionals often maintain none. */
  ranksPerDivision: number;
  /**
   * Share of each division's talent pool this promotion signs. Used at genesis to stratify
   * the roster, and later by the contract system to decide how aggressively it recruits.
   */
  rosterShare: number;
}

export type ContractStatus = 'active' | 'expired' | 'terminated';

export interface Contract {
  readonly id: string;
  readonly fighterId: string;
  readonly promotionId: string;
  signedDate: SimDate;
  /** Contracts are fight-count based, as in the real sport, with a calendar backstop. */
  fightsTotal: number;
  fightsRemaining: number;
  expiresDate: SimDate;
  /** Purse in dollars for showing up. */
  baseShow: number;
  /** Additional purse for a win. */
  winBonus: number;
  /** Share of pay-per-view points, 0 for most of the roster. */
  ppvPoints: number;
  status: ContractStatus;
}

export interface RankingEntry {
  readonly promotionId: string;
  readonly divisionKey: string;
  readonly fighterId: string;
  /** 0 = champion, 1..N = ranked contenders, undefined = unranked. */
  rank: number;
  /** Ranking points; rankings are ordered by this, not by raw record (brief §24). */
  points: number;
  previousRank?: number;
  updatedDate: SimDate;
}

export function isChampion(entry: RankingEntry): boolean {
  return entry.rank === 0;
}
