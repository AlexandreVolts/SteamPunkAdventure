import { App } from "./App";
import { ASprite } from "./ASprite";

export class BackgroundLayer extends ASprite
{
  private static readonly SPEED_RATIO = 75;
  private readonly speed: number;

  constructor(index: number)
  {
    super(
      document.getElementById('bg-layer-' + index) as HTMLImageElement,
      {x: App.WIDTH * 2, y: App.HEIGHT},
    );
    this.speed = index * BackgroundLayer.SPEED_RATIO;
  }
  
  public update(delta: number): void
  {
    this.position.x -= this.speed * delta;
    if (this.position.x < -this.size.x) {
      this.position.x = 0;
    }
  }
  public draw(ctx: CanvasRenderingContext2D): void
  {
      super.draw(ctx);
      ctx.drawImage(
          this.image, 
          this.position.x + this.size.x - 1, this.position.y,
          this.size.x, this.size.y,
      );
  }
}