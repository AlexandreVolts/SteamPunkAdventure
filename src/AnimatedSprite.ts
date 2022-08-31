import { ASprite } from "./ASprite";
import { Vector2 } from "./Vector2";

export class AnimatedSprite extends ASprite
{
    private static readonly ANIMATION_SPEED = 30;
    private readonly sourceSize = {x: 0, y: 0};
    protected runOnce = false;
    private isFinished = false;
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
        if (this.currentFrame >= this.nbFrames) {
            this.currentFrame = 0;
            this.isFinished = this.runOnce;
        }
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
    public get isAlive(): boolean
    {
        return (!this.isFinished);
    }
}