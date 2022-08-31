import { Vector2 } from "../Vector2";
import { AParticle } from "./AParticle";

export class AnimatedParticle extends AParticle
{
  private static readonly NB_FRAMES = 8;

  constructor(type: string, position: Vector2, size?: Vector2)
  {
    super(type, {...position}, AnimatedParticle.NB_FRAMES);
    this.runOnce = true;
    if (size) {
      this.size.x = size.x;
      this.size.y = size.y;
    }
  }

  public update(delta: number): void
  {
    super.update(delta * 0.5);
  }
}