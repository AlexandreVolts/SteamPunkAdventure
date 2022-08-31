import { AnimatedSprite } from "../AnimatedSprite";
import { Vector2 } from "../Vector2";

export class AParticle extends AnimatedSprite
{
  constructor(type: string, protected position: Vector2, nbFrames = 1)
  {
    super(document.getElementById(type) as HTMLImageElement, {x: 0, y: 0}, nbFrames);
    const size = 25 + Math.random() * 50;

    this.size.x = size;
    this.size.y = size;
  }
}