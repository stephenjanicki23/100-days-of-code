/**
 * Who the two fighters are, as plain data.
 *
 * Kept free of three.js so the offline renderer can read the same values: the path-traced
 * clip and the live viewer must dress the same man, or the two stop being the same fight seen
 * through different lenses.
 */

export interface FighterPalette {
  readonly skin: number;
  readonly trunks: number;
  readonly gloves: number;
  readonly hair: number;
  /** Which cut, indexed into `HAIR_STYLES`. */
  readonly hairStyle: number;
  /**
   * How long the trunks are: 0 is cut high on the thigh, 1 comes down toward the knee.
   *
   * Kit is most of how a viewer tells two men apart at range, and a card where everyone wears
   * the same shorts throws that away.
   */
  readonly trunkLength: number;
  readonly beard: boolean;
  /** The colour light takes on after passing through flesh; drives the subsurface term. */
  readonly subsurface: number;
}

export const PALETTE_A: FighterPalette = {
  skin: 0xb07a52,
  trunks: 0xb8323d,
  gloves: 0xc4323a,
  hair: 0x2b2019,
  hairStyle: 0,
  trunkLength: 0.22,
  beard: true,
  subsurface: 0xa8422a,
};

export const PALETTE_B: FighterPalette = {
  skin: 0x7d4d30,
  trunks: 0x2a5fc4,
  gloves: 0x2f5ed0,
  hair: 0x191310,
  hairStyle: 1,
  trunkLength: 0.85,
  beard: false,
  subsurface: 0x8c3220,
};

