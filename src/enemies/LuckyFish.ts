import { Vector2 } from "../Vector2";
import { AEnemy } from "./AEnemy";
import enemies from "./../json/enemies.json"

export class LuckyFish extends AEnemy
{
  constructor()
  {
    super("lucky", enemies["lucky-fish"]);
  }
  public getPosition(): Vector2
  {
    return (this.position);
  }
}