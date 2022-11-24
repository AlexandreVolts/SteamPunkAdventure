import { AEnemy } from "./AEnemy";
import { Drone } from "./Drone";
import enemies from "./../json/enemies.json"

export class HiveWhale extends AEnemy
{
  public static readonly NB_DRONES = 5;

  constructor()
  {
    super('hivewhale', enemies["hive-whale"]);
  }

  public generateChildren(): Drone[]
  {
    return (Array.from({ length: HiveWhale.NB_DRONES }).map(() => {
      const position = {
        x: this.position.x + Math.random() * this.size.x,
        y: this.position.y + Math.random() * this.size.y,
      };

      return (new Drone(position));
    }));
  }
}