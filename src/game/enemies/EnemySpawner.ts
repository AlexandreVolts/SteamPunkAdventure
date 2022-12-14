import { AEnemy } from "./AEnemy";
import { Angler } from "./Angler";
import { HiveWhale } from "./HiveWhale";
import { LuckyFish } from "./LuckyFish";
import { NightAngler } from "./NightAngler";
import levels from "./../json/levels.json";
import { Drone } from "./Drone";

export class EnemySpawner
{
  private static readonly ctors = {
    "angler": Angler,
    "night-angler": NightAngler,
    "lucky-fish": LuckyFish,
    "hive-whale": HiveWhale,
    "drone": Drone,
  };
  private elapsedTime = 0;
  private delay = 0;
  private enemies: AEnemy[];
  private isRunning = false;
  public readonly maxScore: number;

  constructor(
    level: number,
    private readonly onNewEnemy: (enemy: AEnemy) => void,
  )
  {
    this.enemies = this.loadLevel(level);
    this.maxScore = this.enemies.reduce((prev, cur) => cur.score * 100 * 2 + prev, 0);
  }

  private loadLevel(level: number): AEnemy[]
  {
    this.delay = levels[level].delay;
    return (levels[level].composition.map((enemyData) => {
      const type = enemyData.type as keyof typeof EnemySpawner.ctors;

      return (Array.from({length: enemyData.quantity}).map(() => new EnemySpawner.ctors[type]()));
    }).flat());
  }
  private generate(): AEnemy
  {
    const index = ~~(Math.random() * this.enemies.length);
    
    return (this.enemies.splice(index, 1)[0]);
  }

  public launch()
  {
    this.isRunning = true;
  }
  public stop()
  {
    this.isRunning = false;
  }
  public update(delta: number): void
  {
    if (!this.isRunning)
      return;
    this.elapsedTime += delta;
    if (this.elapsedTime < this.delay) {
      return;
    }
    if (this.enemies.length > 0) {
      this.onNewEnemy(this.generate());
    }
    this.elapsedTime = 0;
  }
  public get isEmpty(): boolean
  {
    return (!this.enemies.length);
  }
}