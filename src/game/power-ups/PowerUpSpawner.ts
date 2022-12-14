import { Vector2 } from "../Vector2";
import { APowerUp } from "./APowerUp";
import { OvershootPower } from "./OvershootPower";

export class PowerUpSpawner
{
  private static readonly ctors = [OvershootPower];

  public generate(position: Vector2): APowerUp
  {
    const index = ~~(Math.random() * PowerUpSpawner.ctors.length);
    
    return (new PowerUpSpawner.ctors[index](position));
  }
}