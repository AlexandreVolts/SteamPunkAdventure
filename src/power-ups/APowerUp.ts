import { App } from "../App";
import { ASprite } from "../ASprite";
import { Hitable } from "../Hitable";
import { Player } from "../Player";
import { Vector2 } from "../Vector2";

export abstract class APowerUp extends ASprite implements Hitable
{
  private static readonly SIZE = 50;
  private static readonly DURATION = 8;
  private readonly direction: Vector2 = { x: -400, y: Math.sign(Math.random() - 0.5) * 50 };
  public hit = false;
  private elapsedTime = 0;

  constructor(image: HTMLImageElement)
  {
    super(image, {x: APowerUp.SIZE, y: APowerUp.SIZE});
  }
  
  public update(delta: number): void
  {
    this.elapsedTime += delta;
    this.position.x += this.direction.x * delta;
    this.position.y += this.direction.y * delta;
    if (this.position.y < 0 || this.position.y > App.HEIGHT - this.size.y) {
      this.direction.y *= -1;
    }
  }
  public draw(ctx: CanvasRenderingContext2D): void
  {
      ctx.drawImage(
        this.image,
        this.position.x, this.position.y,
        this.size.x, this.size.y,
      );
  }
  public get isAlive(): boolean
  {
    return (!this.hit);
  }
  public get isCleaned(): boolean
  {
    return (this.elapsedTime >= APowerUp.DURATION);
  }

  public abstract apply(player: Player): void;
  public abstract clean(player: Player): void;
}