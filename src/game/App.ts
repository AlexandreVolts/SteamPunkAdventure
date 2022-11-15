import { ASprite } from "./ASprite";
import { Background } from "./Background";
import { AEnemy } from "./enemies/AEnemy";
import { EnemySpawner } from "./enemies/EnemySpawner";
import { HiveWhale } from "./enemies/HiveWhale";
import { LuckyFish } from "./enemies/LuckyFish";
import { GearParticle } from "./particles/GearParticle";
import { Player } from "./Player";
import { APowerUp } from "./power-ups/APowerUp";
import { PowerUpSpawner } from "./power-ups/PowerUpSpawner";
import { Projectile } from "./Projectile";
import { Score } from "./Score";

type FinishedCallback = (won: boolean, score: number, maxScore: number) => void;

export class App
{
	public static readonly WIDTH = 1500;
	public static readonly HEIGHT = 700;
	public static readonly TOP_GROUND = 550;
	public static readonly BOTTOM_GROUND = 650;
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

	constructor(level: number, private readonly onLevelFinished: FinishedCallback)
	{
		this.canvas = document.getElementsByTagName("canvas")[0];
		this.canvas.width = App.WIDTH;
		this.canvas.height = App.HEIGHT;
		this.ctx = this.canvas.getContext("2d")!;
		this.sprites.push(this.player);
		this.enemySpawner = new EnemySpawner(level, (e) => this.sprites.push(e));
		this.render();
	}

	private onCollideWithEnemy(sprite: AEnemy)
	{
		if (!sprite.isRectangleColliding(this.player) || !this.player.isAlive) {
			return;
		}
		this.sprites.push(...this.player.hit());
		sprite.kill();
	}
	private manageEnemy(sprite: AEnemy)
	{
		this.sprites.forEach((s) => {
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
	private end = () => {
		this.isFinished = true;
		this.onLevelFinished(
			this.player.isAlive,
			this.score.get(),
			this.enemySpawner.maxScore,
		);
	}
	private get areAllParticlesDead(): boolean
	{
		return (!this.sprites.filter((sprite) => sprite instanceof GearParticle).length)
	}
	private get areAllEntitiesDead(): boolean
	{
		return (this.enemySpawner.areAllEnemiesKilled && this.areAllParticlesDead);
	}

	public update(delta: number)
	{
		this.background.update(delta);
		this.enemySpawner.update(delta);
		for (const sprite of this.sprites) {
			sprite.update(delta);
			if (this.isFinished)
				continue;
			if (sprite instanceof AEnemy) {
				this.manageEnemy(sprite);
				this.onCollideWithEnemy(sprite);
			}
			if (sprite instanceof APowerUp && this.player.isRectangleColliding(sprite)) {
				this.player.attachPowerUp(sprite);
				sprite.hit = true;
			}
		}
		this.sprites = this.sprites.filter((sprite) => sprite.isAlive);
		if ((!this.player.isAlive && this.areAllParticlesDead) || this.areAllEntitiesDead) {
			this.end();
		}
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
		window.requestAnimationFrame(this.render);
	}
}