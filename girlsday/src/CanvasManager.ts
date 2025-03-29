export default class CanvasManager {
  private canvas: HTMLCanvasElement;
  private canvasDims: { width: number; height: number };
  private aspectRatio = 1;

  constructor(
    canvas: HTMLCanvasElement,
    canvasDims: { width: number; height: number }
  ) {
    this.canvas = canvas;
    this.canvasDims = canvasDims;
    this.aspectRatio = this.canvasDims.width / this.canvasDims.height;
    this.theatorFit();
  }

  theatorFit() {
    if (!this.canvas) {
      return;
    }

    const windowRatio = window.innerWidth / window.innerHeight;

    if (windowRatio > this.aspectRatio) {
      this.canvas.style.height = window.innerHeight + "px";
      this.canvas.style.width = window.innerHeight * this.aspectRatio + "px";
    } else {
      this.canvas.style.width = window.innerWidth + "px";
      this.canvas.style.height = window.innerWidth / this.aspectRatio + "px";
    }
    this.canvas.style.aspectRatio = this.aspectRatio.toString();
  }
}
