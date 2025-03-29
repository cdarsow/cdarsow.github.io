import CanvasManager from "./CanvasManager";

export default class InteractionManager {
  private canvasManager: CanvasManager;

  constructor(canvasManager: CanvasManager) {
    this.canvasManager = canvasManager;

    window.onresize = this.theatorFit;

    // canvas.value.addEventListener("mousedown", () => {
    //     console.log("mouse down");
    //   });
  }

  theatorFit() {
    this.canvasManager.theatorFit();
  }
}
