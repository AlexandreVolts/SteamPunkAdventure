import { BackgroundLayer } from "./BackgroundLayer";

export class Background
{
    private static readonly LAYER_NUMBER = 4;
    private static readonly FOREGROUND_LIMIT = 3;
    private layers = new Array<BackgroundLayer>();

    constructor()
    {
        for (let i = 0; i < Background.LAYER_NUMBER; i++) {
            this.layers.push(new BackgroundLayer(i + 1));
        }
    }
    public update(delta: number): void
    {
        for (const layer of this.layers) {
            layer.update(delta);
        }
    }
    public draw(ctx: CanvasRenderingContext2D): void
    {
        for (const layer of this.layers.slice(0, Background.FOREGROUND_LIMIT)) {
            layer.draw(ctx);
        }
    }
    public drawForeground(ctx: CanvasRenderingContext2D): void
    {
        for (const layer of this.layers.slice(Background.FOREGROUND_LIMIT)) {
            layer.draw(ctx);
        }
    }
}