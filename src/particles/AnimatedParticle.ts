import { Vector2 } from "../Vector2";
import { AParticle } from "./AParticle";

export class AnimatedParticle extends AParticle
{
  private static readonly NB_FRAMES = 8;

  constructor(type: "fire-explosion"|"smoke-explosion", position: Vector2)
  {
    super(type, {...position}, AnimatedParticle.NB_FRAMES);
    this.runOnce = true;
  }
}