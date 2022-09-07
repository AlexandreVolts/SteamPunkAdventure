export class Score
{
  private score = 0;

  public draw(ctx: CanvasRenderingContext2D): void
  {
    ctx.fillStyle = "white";
    ctx.font = "25px 'Steam Punk Flyer'";
    ctx.fillText(`Score: ${this.score} points`, 20, 40);
  }
  public add(added: number): void
  {
    this.score += added * 100;
  }
  public get(): number
  {
    return (this.score);
  }
}