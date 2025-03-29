import ImageLoader from "./ImageLoader";

export default class CharacterManager {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private imageLoader: ImageLoader;
  private character: string = "";
  private x = 50;
  private y = 500;
  private introStepCounter = 0;
  private introSpeed = 5;
  private speed = this.introSpeed;

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

    this.introStepCounter++;
    if (this.introStepCounter > 200 / this.introSpeed) {
      if (this.speed > 0) {
        this.speed = -1 * this.introSpeed;
      } else {
        this.speed = this.introSpeed;
      }
      this.introStepCounter = 0;
    }

    this.x += this.speed;

    this.context.drawImage(
      this.imageLoader.getImage(this.character),
      this.x,
      this.y
    );
  }
}
