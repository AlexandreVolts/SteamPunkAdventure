import { Vector2 } from "../Vector2";
import { APowerUp } from "./APowerUp";
import { InvinciblePower } from "./InvinciblePower";
import { OvershootPower } from "./OvershootPower";

export class PowerUpSpawner
{
  private static readonly ctors = [InvinciblePower, OvershootPower];

  public generate(position: Vector2): APowerUp
  {
    const index = ~~(Math.random() * PowerUpSpawner.ctors.length);
    
    return (new PowerUpSpawner.ctors[index](position));
  }
}