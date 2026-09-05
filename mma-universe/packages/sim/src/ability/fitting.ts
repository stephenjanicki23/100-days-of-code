/**
 * Fitting attributes to a target ability.
 *
 * Generation works backwards from the ability model: we know the *shape* we want (an
 * archetype's offsets plus individual variation) and the *level* we want (a target Current
 * Ability), and we need attributes that produce both.
 *
 * Rather than invert the facet projection analytically — which is impossible once best-of
 * selections and clamping are involved — we exploit the fact that ability is monotonically
 * non-decreasing in a uniform level shift, and binary-search the shift. It converges to
 * within a fraction of an ability point in well under fifty iterations, and it keeps working
 * unchanged if the facet weights are ever re-tuned.
 */

import {
  buildAttributes,
  type AttributeKey,
  type AttributeSet,
} from '../domain/attributes.ts';
import { clampAttribute } from '../core/math.ts';
import { computeCurrentAbility, MAX_ABILITY } from './ability.ts';

export type AttributeOffsets = Readonly<Partial<Record<AttributeKey, number>>>;

function attributesAtLevel(level: number, offsets: AttributeOffsets): AttributeSet {
  return buildAttributes((key) => clampAttribute(level + (offsets[key] ?? 0)));
}

export interface FitResult {
  readonly attributes: AttributeSet;
  readonly achievedAbility: number;
  /** The base level the search settled on; useful for diagnostics and tests. */
  readonly level: number;
}

/**
 * Finds attributes whose projected Current Ability matches `targetAbility` as closely as the
 * shape allows. An extreme shape (very large offsets) can make some targets unreachable —
 * the closest achievable result is returned rather than throwing, because generation should
 * degrade gracefully rather than fail on an unlucky draw.
 */
export function fitAttributesToAbility(targetAbility: number, offsets: AttributeOffsets): FitResult {
  const target = Math.min(Math.max(targetAbility, 1), MAX_ABILITY);

  let low = -80;
  let high = 140;
  let level = 0;
  let attributes = attributesAtLevel(level, offsets);
  let achieved = computeCurrentAbility(attributes);

  for (let i = 0; i < 48; i++) {
    level = (low + high) / 2;
    attributes = attributesAtLevel(level, offsets);
    achieved = computeCurrentAbility(attributes);
    if (Math.abs(achieved - target) < 0.05) break;
    if (achieved < target) low = level;
    else high = level;
  }

  return { attributes, achievedAbility: achieved, level };
}
