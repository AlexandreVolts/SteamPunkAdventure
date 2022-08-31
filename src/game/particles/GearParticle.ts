import { App } from "../App";
import { Vector2 } from "../Vector2";
import { AParticle } from "./AParticle";

export class GearParticle extends AParticle
{
  private static readonly NB_COLS = 3;
  private static readonly NB_ROWS = 3;
  private readonly gearSpritePosition: Vector2;
  private readonly velocity = {
    x: -300 + Math.random() * 300, y: -800 + Math.random() * 400
  };
  private readonly gravity = 1000;
  private readonly localGround = App.TOP_GROUND + Math.random() * (App.BOTTOM_GROUND - App.TOP_GROUND);
  private readonly rotationSpeed = (-1 + Math.random() * 2) * 5;
  private angle = 0;
  private bounced = false;

  constructor(position: Vector2)
  {
    super("gears", {...position});
    const index = ~~(Math.random() * GearParticle.NB_COLS * GearParticle.NB_ROWS);

    this.gearSpritePosition = {x: index % GearParticle.NB_COLS,  y: ~~(index / GearParticle.NB_COLS)};
  }

  public update(delta: number): void
  {
    this.angle += delta * this.rotationSpeed;
    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
    this.velocity.y += this.gravity * delta;
    if (this.position.y >= this.localGround && !this.bounced) {
      this.position.y = this.localGround;
      this.velocity.y *= -0.5;
      this.bounced = true;
    }
  }
  public draw(ctx: CanvasRenderingContext2D): void
  {
    const w = this.image.width / GearParticle.NB_COLS;
    const h = this.image.height / GearParticle.NB_COLS
  
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