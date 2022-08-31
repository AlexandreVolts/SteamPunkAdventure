import { App } from "./App";
import { ASprite } from "./ASprite";
import { Hitable } from "./Hitable";
import { Vector2 } from "./Vector2";

export class Projectile extends ASprite implements Hitable
{
  private static readonly WIDTH = 10;
  private static readonly HEIGHT = 3;
  private static readonly GAP_SIZE = 2;
  private static readonly WAVE_STRETCH = 10;
  public static readonly SPEED = 500;
  private variation = 0;
  public hit = false;
  
  constructor(
    protected position: Vector2, 
    private direction: Vector2 = {x: Projectile.SPEED, y: 0},
  ) {
    super(
      document.getElementById("projectile") as HTMLImageElement,
      {x: Projectile.WIDTH, y: Projectile.HEIGHT},
    );
  }

  public update(delta: number): void {
    this.variation += delta * Projectile.WAVE_STRETCH;
    this.position.y += -Math.sin(this.variation) * Projectile.GAP_SIZE;
    this.position.x += this.direction.x * delta;
    this.position.y += this.direction.y * delta;
  }

  public get isAlive(): boolean
  {
    return (this.position.x < App.WIDTH && !this.hit);
  }
}