import ImageLoader from "./ImageLoader";
import Sprite from "./Sprite";

export default class SpriteFactory {
  private types: string[] = [];
  private values: number[] = [];
  private imageLoader: ImageLoader;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private sprites: Sprite[] = [];

  constructor(
    types: string[],
    values: number[],
    imageLoader: ImageLoader,
    canvas: HTMLCanvasElement
  ) {
    this.types = types;
    this.values = values;
    this.imageLoader = imageLoader;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  start() {
    const getRandomInt = (min: number, max: number) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const createSprite = () => {
      if (!this.context) {
        return;
      }

      const random = getRandomInt(0, this.types.length - 1);
      const sprite = new Sprite(
        this.types[random],
        this.imageLoader,
        this.context,
        (getRandomInt(0, 2) * this.canvas.width) / 3 + 50,
        0,
        this.values[random]
      );
      this.sprites.push(sprite);
    };
    setInterval(createSprite, 1250);
  }

  render() {
    this.sprites.forEach((sprite) => {
      const newY = sprite.render();
      if (newY > this.canvas.height) {
        this.sprites.splice(0, 1);
      }
    });
  }
}
