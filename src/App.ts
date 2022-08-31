import { ASprite } from "./ASprite";
import { Background } from "./Background";
import { AEnemy } from "./enemies/AEnemy";
import { Drone } from "./enemies/Drone";
import { EnemySpawner } from "./enemies/EnemySpawner";
import { HiveWhale } from "./enemies/HiveWhale";
import { LuckyFish } from "./enemies/LuckyFish";
import { Player } from "./Player";
import { APowerUp } from "./power-ups/APowerUp";
import { PowerUpSpawner } from "./power-ups/PowerUpSpawner";
import { Projectile } from "./Projectile";
import { Score } from "./Score";

export class App
{
	public static readonly WIDTH = 1500;
	public static readonly HEIGHT = 800;
	public static readonly TOP_GROUND = 600;
	public static readonly BOTTOM_GROUND = 700;
	private readonly canvas: HTMLCanvasElement;
	private readonly ctx: CanvasRenderingContext2D;
	private readonly background = new Background();
	private readonly player = new Player((p) => this.sprites.push(p));
	private readonly enemySpawner: EnemySpawner;
	private readonly powerUpSpawner = new PowerUpSpawner();
	private readonly score = new Score();
	private sprites = new Array<ASprite>();
	private lastDeltaTime = 0;
	private isFinished = false;

	constructor()
	{
		this.canvas = document.getElementsByTagName("canvas")[0];
		this.canvas.width = App.WIDTH;
		this.canvas.height = App.HEIGHT;
		this.ctx = this.canvas.getContext("2d")!;
		this.sprites.push(this.player);
		this.enemySpawner = new EnemySpawner((e) => this.sprites.push(e), () => {});
		this.render();
	}
	
	private manageEnemy(sprite: AEnemy)
	{
		if (sprite.isRectangleColliding(this.player)) {
			this.sprites.push(...this.player.hit());
			sprite.kill();
		}
		this.sprites.map((s) => {
			if (!(s instanceof Projectile) || !sprite.isRectangleColliding(s)) {
				return;
			}
			this.sprites.push(...sprite.hit());
			s.hit = true;
			this.score.add(1);
			if (!sprite.isAlive) {
				this.score.add(sprite.score);
				if (sprite instanceof LuckyFish) {
					this.sprites.push(this.powerUpSpawner.generate(sprite.getPosition()));
				}
				if (sprite instanceof HiveWhale) {
					this.sprites.push(...sprite.generateChildren());
				}
			}
		});
	}

	public update(delta: number)
	{
		this.background.update(delta);
		this.enemySpawner.update(delta);
		for (const sprite of this.sprites) {
			sprite.update(delta);
			if (sprite instanceof AEnemy) {
				this.manageEnemy(sprite);
			}
			if (sprite instanceof APowerUp && this.player.isRectangleColliding(sprite)) {
				this.player.attachPowerUp(sprite);
				sprite.hit = true;
			}
		}
		this.sprites = this.sprites.filter((sprite) => sprite.isAlive);
	}
	public draw()
	{
		this.background.draw(this.ctx);
		for (const sprite of this.sprites) {
			sprite.draw(this.ctx);
		}
		this.score.draw(this.ctx);
		this.background.drawForeground(this.ctx);
	}
	public render = (elapsedTime = 0) =>
	{
		this.ctx.clearRect(0, 0, App.WIDTH, App.HEIGHT);
		this.update((elapsedTime - this.lastDeltaTime) / 1000);
		this.draw();
		this.lastDeltaTime = elapsedTime;
		if (!this.isFinished)
			requestAnimationFrame(this.render);
	}
}

document.addEventListener("DOMContentLoaded", () => new App());