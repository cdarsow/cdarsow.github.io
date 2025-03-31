import ImageLoader from "./ImageLoader";

export default class Sprite {
  private image: string;
  private imageLoader: ImageLoader;
  private x = 0;
  private y = 0;
  // Geschwindigkeit einstellen für runterfallende Objekte
  private speed = 1;
  private context: CanvasRenderingContext2D;
  private value = 0;
  private width = 150;
  private height = 150;

  constructor(
    image: string,
    imageLoader: ImageLoader,
    context: CanvasRenderingContext2D,
    initialX: number,
    initialY: number,
    value: number
  ) {
    this.image = image;
    this.imageLoader = imageLoader;
    this.context = context;
    this.x = initialX;
    this.y = initialY;
    this.value = value;
  }

  render() {
    this.y += this.speed;
    this.context.drawImage(
      this.imageLoader.getImage(this.image),
      this.x,
      this.y
    );
    return {
      x: this.x,
      y: this.y,
      w: this.width,
      h: this.height,
      value: this.value,
    };
  }
}
