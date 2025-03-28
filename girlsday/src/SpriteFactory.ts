import ImageLoader from "./ImageLoader";
import Sprite from "./Sprite";

export default class SpriteFactory {
  private types: string[] = [];
  private imageLoader: ImageLoader;
  private context: CanvasRenderingContext2D;
  private sprites: Sprite[] = [];

  constructor(
    types: string[],
    imageLoader: ImageLoader,
    context: CanvasRenderingContext2D
  ) {
    this.types = types;
    this.imageLoader = imageLoader;
    this.context = context;
  }

  start() {
    const createSprite = () => {
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
