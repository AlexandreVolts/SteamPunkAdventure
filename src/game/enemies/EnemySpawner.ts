import { AEnemy } from "./AEnemy";
import { Angler } from "./Angler";
import { HiveWhale } from "./HiveWhale";
import { LuckyFish } from "./LuckyFish";
import { NightAngler } from "./NightAngler";
import levels from "./../json/levels.json";

export class EnemySpawner
{
  private static readonly ctors = {
    "angler": Angler,
    "night-angler": NightAngler,
    "lucky-fish": LuckyFish,
    "hive-whale": HiveWhale,
  };
  private elapsedTime = 0;
  private level = 1;
  private delay = 0;
  private enemies: AEnemy[];

  constructor(
    private readonly onNewEnemy: (enemy: AEnemy) => void,
    private readonly onLevelFinished: (level: number) => void,
  )
  {
    this.enemies = this.loadLevel(this.level);
  }

  private loadLevel(level: number): AEnemy[]
  {
    level--;
    this.delay = levels[level].delay;
    return (levels[level].composition.map((enemyData) => {
      const type = enemyData.type as keyof typeof EnemySpawner.ctors;

      return (Array.from({length: enemyData.quantity}).map(() => new EnemySpawner.ctors[type]()));
    }).flat());
  }
  private increaseLevel(): void
  {
    this.level++;
    this.enemies = this.loadLevel(this.level);
  }
  private generate(): AEnemy
  {
    const index = ~~(Math.random() * this.enemies.length);
    
    return (this.enemies.splice(index, 1)[0]);
  }

  public update(delta: number): void
  {
    this.elapsedTime += delta;
    if (this.elapsedTime < this.delay) {
      return;
    }
    if (this.enemies.length > 0) {
      this.onNewEnemy(this.generate());
    }
    this.elapsedTime = 0;
    if (this.isLevelFinished) {
      this.onLevelFinished(this.level);
      this.increaseLevel();
    }
  }
  public get isLevelFinished(): boolean
  {
    return (this.enemies.filter((e) => e.isAlive).length === 0);
  }
}