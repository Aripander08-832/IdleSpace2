import { Spell } from "./spell";
import { Game } from "../game";
import { Bonus } from "../bonus/bonus";

const baseBonus = new Decimal(0.2);
const buildingBonus = new Decimal(0.01);
export class DroneSpell extends Spell {
  id = "d1";
  name = "Drones initiative";
  icon = "my:vintage-robot";
  colorClass = "production-color";
  duration = 60 * 5 * 1e3;
  price = 3e3;
  constructor() {
    super();
    this.description =
      "Drones yields (" +
      baseBonus.times(100).toString() +
      " + " +
      buildingBonus.times(100).toString() +
      " per relative building)% more resources";
    const game = Game.getGame();

    const workers = [
      game.resourceManager.miner,
      game.resourceManager.technician,
      game.resourceManager.scientist,
      game.resourceManager.metallurgist,
      game.resourceManager.worker,
      game.resourceManager.searcher,
      game.resourceManager.replicator,
      game.resourceManager.nukeDrone
    ];
    const buildings = [
      game.resourceManager.mine,
      game.resourceManager.powerPlant,
      game.resourceManager.laboratory,
      game.resourceManager.foundry,
      game.resourceManager.factory,
      game.resourceManager.observatory,
      game.resourceManager.droneFactory,
      game.resourceManager.nukeFactory
    ];

    for (let i = 0; i < 8; i++) {
      workers[i].prodEfficiency.bonuses.push(
        new Bonus(this, baseBonus, null, buildings[i], buildingBonus)
      );
    }
  }
}
