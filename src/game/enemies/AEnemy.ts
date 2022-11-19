import { App } from "../App";
import { AnimatedSprite } from "../AnimatedSprite";
import { ParticleEmitter } from "../particles/ParticleEmitter";
import { IEnemyProps } from "./IEnemyProps";
import { Utils } from "../Utils";
import { Vector2 } from "../Vector2";
import { AParticle } from "../particles/AParticle";
import { AnimatedParticle } from "../particles/AnimatedParticle";

export class AEnemy extends AnimatedSprite
{
    private static readonly NB_FRAMES = 39;
    private static readonly WIDTH = 200;
    private static readonly HEIGHT = 150;
    private static readonly SIZE_MODIFIER = 0.05;
    private readonly defaultSize: Vector2;
    private readonly speed: number;
    private sizeModifier = 0;
    private lives = 0;
    public readonly score: number;

    constructor(type: string, props: IEnemyProps)
    {
        super(
            document.getElementById(type) as HTMLImageElement,
            { x: AEnemy.WIDTH, y: AEnemy.HEIGHT }, AEnemy.NB_FRAMES, props.rows,
        );
        const size = Utils.rand(props.size.min, props.size.max);

        this.position.x = App.WIDTH;
        this.position.y = AEnemy.HEIGHT / 2 + Math.random() * (App.TOP_GROUND - AEnemy.HEIGHT / 2);
        this.size.x *= size;
        this.size.y *= size;
        this.defaultSize = {...this.size};
        this.speed = Utils.rand(props.speed.min, props.speed.max);
        this.lives = ~~(props.lives * size);
        this.score = this.lives;
        this.row = ~~(Math.random() * props.rows);
    }

    public update(delta: number): void
    {
        super.update(delta);
        this.position.x -= delta * this.speed;
        if (this.sizeModifier > 0)
            this.sizeModifier -= delta;
        this.size.x = this.defaultSize.x * (1 + this.sizeModifier);
        this.size.y = this.defaultSize.y * (1 + this.sizeModifier);
    }
    public hit(): AParticle[]
    {
        const output = ParticleEmitter.emit(this.position, this.size);
        
        this.lives--;
        this.sizeModifier = AEnemy.SIZE_MODIFIER;
        if (!this.isAlive) {
            output.push(new AnimatedParticle("fire-explosion", this.position, this.size));
        }
        return (output);
    }
    public kill(): void
    {
        this.lives = 0;
    }
    public draw(ctx: CanvasRenderingContext2D): void
    {
        const half = this.size.x * 0.5;

        super.draw(ctx);
        if (this.lives === this.score)
            return;
        ctx.fillStyle = "orange";
        ctx.fillRect(this.position.x + half * 0.5, this.position.y, half, 4);
        ctx.fillStyle = "green";
        ctx.fillRect(this.position.x + half * 0.5, this.position.y, half * (this.lives / this.score), 4);
    }
    
    public get isAlive(): boolean
    {
        return (this.position.x >= -this.size.x && this.lives > 0);
    }
}