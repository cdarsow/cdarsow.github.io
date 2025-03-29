import ColorManager from "./ColorManager";
import TextManager from "./TextManager";
export default class InteractionManager {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private startEventAdded = false;
  private startW = 125;
  private startH = 50;
  private colorManager: ColorManager;
  private textManager: TextManager;

  constructor(
    canvas: HTMLCanvasElement,
    colorManager: ColorManager,
    textManager: TextManager
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.colorManager = colorManager;
    this.textManager = textManager;
  }

  addStartBtn(callback: () => void) {
    if (!this.context || !this.textManager.getFontLoaded()) {
      return;
    }

    this.context.rect(
      this.canvas.width / 2 - this.startW / 2,
      this.canvas.height / 2 - this.startH / 2,
      this.startW,
      this.startH
    );
    this.context.lineWidth = 5;
    this.context.strokeStyle = this.colorManager.strokeColor;
    this.context.stroke();
    this.context.fillStyle = this.colorManager.fillColor;
    this.context.fill();

    this.context.font = "24px " + this.textManager.getFont();
    this.context.textAlign = "center";
    this.context.fillStyle = this.colorManager.strokeColor;
    this.context.fillText(
      "Start",
      this.canvas.width / 2,
      this.canvas.height / 2 + this.startH / 6
    );

    const eventHandler = (event: MouseEvent) => {
      if (this.startBtnClicked(event)) {
        this.canvas.removeEventListener("mousedown", eventHandler);
        callback();
      }
    };

    if (!this.startEventAdded) {
      this.startEventAdded = true;
      this.canvas.addEventListener("mousedown", eventHandler);
    }
  }

  startBtnClicked(event: MouseEvent): boolean {
    const x = event.clientX;
    const y = event.clientY;
    const btnXStart = this.canvas.width / 2 - this.startW / 2;
    const btnXEnd = this.canvas.width / 2 + this.startW / 2;
    const btnYStart = this.canvas.height / 2 - this.startH / 2;
    const btnYEnd = this.canvas.height / 2 + this.startH / 2;

    if (!(btnXStart < x && x < btnXEnd)) {
      return false;
    }
    if (!(btnYStart < y && y < btnYEnd)) {
      return false;
    }
    return true;
  }
}
