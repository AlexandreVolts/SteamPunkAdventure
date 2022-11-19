import { Vector2 } from "../Vector2";
import { AEnemy } from "./AEnemy";
import enemies from "./../json/enemies.json"

export class Drone extends AEnemy
{
  constructor(position?: Vector2)
  {
    super("drone", enemies.drone);

    this.position.x = position?.x ?? this.position.x;
    this.position.y = position?.y ?? this.position.y;
  }
}