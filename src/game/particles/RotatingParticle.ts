import { App } from "../App";
import { AParticle } from "./AParticle";

export class RotatingParticle extends AParticle
{
  private readonly gravity = 1000;
  private readonly localGround = App.TOP_GROUND + Math.random() * (App.BOTTOM_GROUND - App.TOP_GROUND);
  private readonly rotationSpeed = (-1 + Math.random() * 2) * 5;
  private readonly velocity = {
    x: -300 + Math.random() * 300, y: -800 + Math.random() * 400
  };
  private _angle = 0;
  private bounced = false;

  public update(delta: number): void
  {
    this._angle += delta * this.rotationSpeed;
    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
    this.velocity.y += this.gravity * delta;
    if (this.position.y >= this.localGround && !this.bounced) {
      this.position.y = this.localGround;
      this.velocity.y *= -0.5;
      this.bounced = true;
    }
  }

  public get angle(): number
  {
    return (this._angle);
  }
}