import { RotatingParticle } from "./particles/RotatingParticle";

export class Heart extends RotatingParticle {
  private static readonly SIZE = 40;
  private static readonly PADDING = 10;
  private isKilled = false;

  constructor(index: number) {
    super(
      "life",
      {
        x: Heart.PADDING + (Heart.SIZE + Heart.PADDING) * index,
        y: Heart.PADDING,
      },
    );
    this.size.x = Heart.SIZE;
    this.size.y = Heart.SIZE;
  }

  public update(delta: number): void {
    if (this.isAlive)
      return;
    super.update(delta);
  }
  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.isAlive) {
      super.draw(ctx);
      return;
    }
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, 0, 0, this.size.x, this.size.y);
    ctx.restore();
  }

  public kill() {
    this.isKilled = true;
  }
  public get isAlive() {
    return (!this.isKilled);
  }
}