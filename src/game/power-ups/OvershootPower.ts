import { Player } from "../Player";
import { Vector2 } from "../Vector2";
import { APowerUp } from "./APowerUp";

export class OvershootPower extends APowerUp
{
  constructor(protected position: Vector2)
  {
    super(document.getElementById('overshoot') as HTMLImageElement);
  }

  public apply(player: Player): void
  {
    player.overshoot = true;
  }
  public clean(player: Player): void
  {
    player.overshoot = false;
  }
}