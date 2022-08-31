import { GearParticle } from "./GearParticle";
import { Vector2 } from "../Vector2";
import { AnimatedParticle } from "./AnimatedParticle";
import { AParticle } from "./AParticle";

export abstract class ParticleEmitter
{
  public static emit(position: Vector2, size = position, quantity = 1): AParticle[]
  {
    return (Array.from({length: quantity}).map(() => {
      const pos = {
        x: position.x + Math.random() * size.x,
        y: position.y + Math.random() * size.y,
      };
      const output: AParticle[] = [new GearParticle(pos)];

      if (Math.random() < 0.5) {
        output.push(new AnimatedParticle("smoke-explosion", pos));
      }
      return (output);
    }).flat());
  }
  public static emitFire(position: Vector2, size = position, quantity = 1): AnimatedParticle[]
  {
    return (Array.from({length: quantity}).map(() => {
      return (new AnimatedParticle("fire-explosion", {
        x: position.x + Math.random() * size.x,
        y: position.y + Math.random() * size.y,
      }));
    }));
  }
}