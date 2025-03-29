import ImageLoader from "./ImageLoader";

export default class Sprite {
  private image: string;
  private imageLoader: ImageLoader;
  private x = 0;
  private y = 0;
  private speed = 0;
  private context: CanvasRenderingContext2D;
  private value = 0;

  constructor(
    image: string,
    imageLoader: ImageLoader,
    context: CanvasRenderingContext2D,
    initialX: number,
    initialY: number,
    value: number,
    speed: number
  ) {
    this.image = image;
    this.imageLoader = imageLoader;
    this.context = context;
    this.x = initialX;
    this.y = initialY;
    this.value = value;
    this.speed = speed;
  }

  render(): number {
    this.y += this.speed;
    this.context.drawImage(
      this.imageLoader.getImage(this.image),
      this.x,
      this.y
    );
    return this.y;
  }
}
