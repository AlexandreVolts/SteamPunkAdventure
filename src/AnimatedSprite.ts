import { ASprite } from "./ASprite";
import { Vector2 } from "./Vector2";

export class AnimatedSprite extends ASprite
{
    private static readonly ANIMATION_SPEED = 35;
    private readonly sourceSize = {x: 0, y: 0};
    private currentFrame = 0;
    protected row = 0;
    
    constructor(
        image: HTMLImageElement, 
        size: Vector2,
        private nbFrames = 1,
        private nbRows = 1,
    )
    {
        super(image, size);
        this.sourceSize.x = image.width / this.nbFrames;
        this.sourceSize.y = image.height / this.nbRows;
    }

    public update(delta: number)
    {
        this.currentFrame = this.currentFrame + (delta * AnimatedSprite.ANIMATION_SPEED);
        this.currentFrame %= (this.nbFrames - 1);
    }
    public draw(ctx: CanvasRenderingContext2D)
    {
        ctx.drawImage(
            this.image,
            ~~this.currentFrame * this.sourceSize.x, this.row * this.sourceSize.y,
            this.sourceSize.x, this.sourceSize.y,
            this.position.x, this.position.y,
            this.size.x, this.size.y,
        );
    }
}