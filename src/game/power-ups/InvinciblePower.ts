import { Player } from "../Player";
import { Vector2 } from "../Vector2";
import { APowerUp } from "./APowerUp";

export class InvinciblePower extends APowerUp
{
  constructor(protected position: Vector2)
  {
    super(document.getElementById('invincible') as HTMLImageElement);
  }

  public apply(player: Player): void
  {
    player.invincible = true;
  }
  public clean(player: Player): void
  {
    player.invincible = false;
  }
}