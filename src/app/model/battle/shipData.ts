import { Ship } from "./ship";
import { Stats } from "./battleResult";

export class WeaponData {
  damage: number;
  armourPercent: number;
  shieldPercent: number;
  defencePercent: number;
  armourPen: number;
  shieldPen: number;
  precision: number;
  adaptivePrecision: number;
  threatMulti = 1;
}
export class ShipData {
  designId: number;
  name = "";
  totalArmour: number;
  totalShield: number;
  armourReduction: number;
  shieldReduction: number;
  explosionThreshold: number;
  explosionDamage: number;
  threat: number;
  thereatPerRound: number;
  totalThreat: number;
  weapons: WeaponData[];
  quantity: number;
  ships: Ship[];
  alive: Ship[];
  targets: ShipData[];
  stats: Stats;
  explosionWeapon: WeaponData;
  shieldRecharge: number;
  withShield: number;
  withArmour: number;
  defences: number;
  isDefence = false;
}
