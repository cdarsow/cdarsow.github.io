import ImageLoader from "./ImageLoader";

export default class CharacterManager {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private imageLoader: ImageLoader;
  private character: string = "";
  private paddingX = 80;
  private paddingY = 180;
  private x = this.paddingX;
  private y = 0;
  private introSpeed = 8;
  private width = 200;
  private height = 174;
  private nextDirectionChange = 0;

  constructor(
    canvas: HTMLCanvasElement,
    imageLoader: ImageLoader,
    character: string
  ) {
    this.canvas = canvas;
    this.imageLoader = imageLoader;
    this.character = character;
    this.context = canvas.getContext("2d");
  }

  renderIntro() {
    if (!this.context) {
      return;
    }

    this.x += this.introSpeed;

    if (this.introSpeed > 0 && this.x > this.nextDirectionChange) {
      this.introSpeed = -1 * this.introSpeed;
      this.nextDirectionChange = this.paddingX;
    }
    if (this.introSpeed < 0 && this.x < this.nextDirectionChange) {
      this.introSpeed = -1 * this.introSpeed;
      this.nextDirectionChange = this.canvas.width - this.paddingX - this.width;
    }

    this.y = this.canvas.height - this.height - this.paddingY;

    this.context.drawImage(
      this.imageLoader.getImage(this.character),
      this.x,
      this.y
    );
  }

  gotoColumn(column: number) {
    if (!this.context) {
      return;
    }

    this.x =
      (this.canvas.width / 3) * column +
      (this.canvas.width / 3 - this.width) / 2;
    this.y = this.canvas.height - this.height - this.paddingY;
    this.context.drawImage(
      this.imageLoader.getImage(this.character),
      this.x,
      this.y
    );
  }

  getInfo() {
    return {
      x: this.x,
      y: this.y,
      w: this.width,
      h: this.height,
    };
  }
}
