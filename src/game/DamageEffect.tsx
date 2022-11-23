import { App } from "./App";

export class DamageEffect
{
  private static readonly DURATION = 1;
  private static readonly STRENGTH = 0.25;
  private duration = 0;

  public trigger = () => this.duration = DamageEffect.DURATION;
  public update = (delta: number) => this.duration -= delta;
  public shake(ctx: CanvasRenderingContext2D)
  {
    if (this.duration <= 0)
      return;
    ctx.save();
    ctx.translate(Math.random() * 3, Math.random() * 3);
  }
  public draw(ctx: CanvasRenderingContext2D)
  {
    if (this.duration <= 0)
      return;
    ctx.fillStyle = `rgba(255, 0, 0, ${this.duration * DamageEffect.STRENGTH})`;
    ctx.fillRect(0, 0, App.WIDTH, App.HEIGHT);
    ctx.restore();
  }
}