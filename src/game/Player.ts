import { App } from "./App";
import { Projectile } from "./Projectile";
import { AnimatedSprite } from "./AnimatedSprite";
import { APowerUp } from "./power-ups/APowerUp";
import { ParticleEmitter } from "./particles/ParticleEmitter";
import { AParticle } from "./particles/AParticle";

export class Player extends AnimatedSprite
{
    private static readonly WIDTH = 75;
    private static readonly HEIGHT = 150;
    private static readonly NB_FRAMES = 39;
    private static readonly NB_ROWS = 2;
    private static readonly SHOOT_DELAY = 0.1;
    private destinationY = 0;
    private delay = 0;
    private lives = 3;
    private powerUp?: APowerUp;
    public invincible = false;
    public overshoot = false;

    constructor(private readonly onShoot: (projectile: Projectile) => void)
    {
        super(
            document.getElementById("player") as HTMLImageElement,
            {x: Player.WIDTH, y: Player.HEIGHT},
            Player.NB_FRAMES, Player.NB_ROWS,
        );
        this.position.x = App.WIDTH * 0.05;
        window.addEventListener('mousemove', (e) => this.destinationY = e.clientY);
    }

    private loadShoot(delta: number): void
    {
        const position = {
            x: this.position.x + Player.WIDTH,
            y: this.position.y + Player.HEIGHT * 0.25,
        };

        this.delay += delta;
        if (this.delay < Player.SHOOT_DELAY) {
            return;
        }
        this.delay = 0;
        this.onShoot(new Projectile({...position}));
        if (this.overshoot) {
            this.onShoot(new Projectile({...position}, {x: Projectile.SPEED, y: -Projectile.SPEED * 0.4}));
            this.onShoot(new Projectile({...position}, {x: Projectile.SPEED, y: Projectile.SPEED * 0.4}));
        }
    }
    
    public update(delta: number): void
    {
        super.update(delta);
        
        const dist = (this.position.y + Player.HEIGHT) - this.destinationY;

        this.position.y -= dist * delta * 2;
        if (this.position.y < 0) {
            this.position.y = 0;
        }
        if (this.position.y > App.HEIGHT - Player.HEIGHT) {
            this.position.y = App.HEIGHT - Player.HEIGHT;
        }
        this.powerUp?.update(delta);
        if (this.powerUp?.isCleaned) {
            this.powerUp.clean(this);
            this.powerUp = undefined;
        }
        this.row = this.powerUp ? 1 : 0;
        this.loadShoot(delta);
    }
    public hit(): AParticle[]
    {
        if (!this.invincible)
            this.lives--;
        return (ParticleEmitter.emit(this.position, this.size, 8, "fire-explosion"));
    }
    public attachPowerUp(powerUp: APowerUp): void
    {
        this.powerUp?.clean(this);
        powerUp.apply(this);
        this.powerUp = powerUp;
    }

    public get isAlive(): boolean
    {
        return (this.lives > 0);
    }
}