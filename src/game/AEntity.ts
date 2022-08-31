import { Vector2 } from "./Vector2";

export abstract class AEntity
{
    constructor(
        protected readonly position: Vector2, 
        protected readonly size: Vector2,
    ) {}

    public abstract update(delta: number):void;
    public abstract draw(ctx: CanvasRenderingContext2D):void;

    public isCircleColliding(entity: AEntity): boolean
    {
        const dx = this.position.x - entity.position.x;
        const dy = this.position.y - entity.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return (distance < (this.size.x + entity.size.x) * 0.5);
    }
    public isRectangleColliding(entity: AEntity): boolean
    {
        return (
            this.position.x < entity.position.x + entity.size.x &&
            this.position.x + this.size.x > entity.position.x &&
            this.position.y < entity.position.y + entity.size.y &&
            this.position.y + this.size.y > entity.position.y
        );
    }
}