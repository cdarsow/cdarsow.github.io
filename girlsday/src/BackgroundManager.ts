import ImageLoader from "./ImageLoader";

export default class BackgroundManager {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private imageLoader: ImageLoader;
  private background: string = "";

  constructor(
    canvas: HTMLCanvasElement,
    imageLoader: ImageLoader,
    background: string
  ) {
    this.canvas = canvas;
    this.imageLoader = imageLoader;
    this.background = background;
    this.context = canvas.getContext("2d");
  }

  render() {
    if (!this.context) {
      return;
    }

    this.context.drawImage(this.imageLoader.getImage(this.background), 0, 0);
  }
}
