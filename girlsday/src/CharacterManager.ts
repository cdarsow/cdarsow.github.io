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
  private characterWidth = 200;
  private characterHeight = 174;
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
      this.nextDirectionChange =
        this.canvas.width - this.paddingX - this.characterWidth;
    }

    this.y = this.canvas.height - this.characterHeight - this.paddingY;

    this.context.drawImage(
      this.imageLoader.getImage(this.character),
      this.x,
      this.y
    );
  }

  gotoStartPosition() {
    if (!this.context) {
      return;
    }

    this.x = this.canvas.width / 2 - this.characterWidth / 2;
    this.y = this.canvas.height - this.characterHeight - this.paddingY;
    this.context.drawImage(
      this.imageLoader.getImage(this.character),
      this.x,
      this.y
    );
  }
}
