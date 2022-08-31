import { Particle } from "./Particle";
import { Vector2 } from "./Vector2";

export abstract class ParticleEmitter
{
  public static emit(position: Vector2, size = position, quantity = 1): Particle[]
  {
    return (Array.from({length: quantity}).map(() => {
      return (new Particle({
        x: position.x + Math.random() * size.x,
        y: position.y + Math.random() * size.y,
      }));
    }));
  }
}