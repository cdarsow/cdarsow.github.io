export default class CanvasManager {
  private canvas: HTMLCanvasElement;
  private canvasDims: { width: number; height: number };

  constructor(
    canvas: HTMLCanvasElement,
    canvasDims: { width: number; height: number }
  ) {
    this.canvas = canvas;
    this.canvasDims = canvasDims;
    this.theatorFit();
  }

  theatorFit() {
    if (!this.canvas) {
      return;
    }

    this.canvas.style.height = window.innerHeight + "px";
    this.canvas.style.width =
      (window.innerHeight * this.canvasDims.width) / this.canvasDims.height +
      "px";
    this.canvas.style.aspectRatio = (
      (window.innerHeight * this.canvasDims.width) /
      this.canvasDims.height /
      window.innerHeight
    ).toString();
  }
}
