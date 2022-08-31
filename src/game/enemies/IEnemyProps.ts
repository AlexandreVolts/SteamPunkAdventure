export interface IEnemyProps
{
  lives: number;
  size: { min: number, max: number },
  speed: { min: number, max: number },
  rows: number;
}