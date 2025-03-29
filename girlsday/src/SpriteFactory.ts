import ImageLoader from "./ImageLoader";
import Sprite from "./Sprite";

export default class SpriteFactory {
  private types: string[] = [];
  private imageLoader: ImageLoader;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private sprites: Sprite[] = [];

  constructor(
    types: string[],
    imageLoader: ImageLoader,
    canvas: HTMLCanvasElement
  ) {
    this.types = types;
    this.imageLoader = imageLoader;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  start() {
    const createSprite = () => {
      if (!this.context) {
        return;
      }

      const sprite = new Sprite(
        this.types[0],
        this.imageLoader,
        this.context,
        Math.random() * 300,
        0,
        30
      );
      this.sprites.push(sprite);
    };
    setInterval(createSprite, 2000);
  }

  render() {
    this.sprites.forEach((sprite) => {
      sprite.render();
    });
  }
}
