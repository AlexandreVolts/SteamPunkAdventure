export class Score
{
  private score = 0;

  public draw(ctx: CanvasRenderingContext2D): void
  {
    ctx.font = '25px Bangers';
    ctx.fillText(`Score: ${this.score} points`, 20, 40);
  }
  public add(added: number): void
  {
    this.score += added * 100;
  }
}