import { IBase } from "../iBase";
import { ONE, ZERO } from "../CONSTANTS";

export class Bonus {
  constructor(
    public unit: IBase,
    public multiplier: Decimal,
    public secondMultiplier: IBase = null
  ) {}
  getBonus(): Decimal {
    let ret = this.unit.quantity.times(this.multiplier);
    if (this.secondMultiplier) ret = ret.times(this.secondMultiplier.quantity);
    return ret.plus(ONE);
  }
  getAdditiveBonus(): Decimal {
    if (this.secondMultiplier && this.secondMultiplier.quantity.eq(0)) {
      return ZERO;
    }
    let ret = this.unit.quantity.times(this.multiplier);
    if (this.secondMultiplier) ret = ret.times(this.secondMultiplier.quantity);
    return ret;
  }
}
