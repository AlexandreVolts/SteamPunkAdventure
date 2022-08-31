import { Vector2 } from "../Vector2";
import { AEnemy } from "./AEnemy";
import enemies from "./../json/enemies.json"

export class Drone extends AEnemy
{
  constructor(protected position: Vector2)
  {
    super("drone", enemies.drone);
  }
}