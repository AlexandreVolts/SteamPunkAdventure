import { AEntity } from "./AEntity";
import { Vector2 } from "./Vector2";

export abstract class ASprite extends AEntity
{
    constructor(protected readonly image: HTMLImageElement, size: Vector2)
    {
        super({x: 0, y: 0}, size);
    }

    public draw(ctx: CanvasRenderingContext2D)
    {
        ctx.drawImage(
            this.image, 
            this.position.x, this.position.y, 
            this.size.x, this.size.y,
        );
    }
    public get isAlive(): boolean
    {
        return true;
    }
}