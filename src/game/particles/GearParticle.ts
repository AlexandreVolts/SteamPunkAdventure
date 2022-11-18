import { App } from "../App";
import { Vector2 } from "../Vector2";
import { RotatingParticle } from "./RotatingParticle";

export class GearParticle extends RotatingParticle
{
  private static readonly NB_COLS = 3;
  private static readonly NB_ROWS = 3;
  private readonly gearSpritePosition: Vector2;

  constructor(position: Vector2)
  {
    super("gears", {...position});
    const index = ~~(Math.random() * GearParticle.NB_COLS * GearParticle.NB_ROWS);

    this.gearSpritePosition = {x: index % GearParticle.NB_COLS,  y: ~~(index / GearParticle.NB_COLS)};
  }

  public draw(ctx: CanvasRenderingContext2D): void
  {
    const w = this.image.width / GearParticle.NB_COLS;
    const h = this.image.height / GearParticle.NB_COLS;
  
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.gearSpritePosition.x * w, this.gearSpritePosition.y * h,
      w, h, this.size.x * -0.5, this.size.y * -0.5, this.size.x, this.size.y,
    );
    ctx.restore();
  }
  public get isAlive(): boolean
  {
    return (this.position.x >= -this.size.x && this.position.y < App.HEIGHT);
  }
}