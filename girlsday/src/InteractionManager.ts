import ColorManager from "./ColorManager";
import TextManager from "./TextManager";
export default class InteractionManager {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private startEventAdded = false;
  private startBtnWidth = 250;
  private startBtnHeight = 100;
  private colorManager: ColorManager;
  private textManager: TextManager;
  private startText = "Start";
  private btnXStart = 0;
  private btnXEnd = 0;
  private btnYStart = 0;
  private btnYEnd = 0;

  constructor(
    canvas: HTMLCanvasElement,
    colorManager: ColorManager,
    textManager: TextManager
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.colorManager = colorManager;
    this.textManager = textManager;

    this.btnXStart = this.canvas.width / 2 - this.startBtnWidth / 2;
    this.btnXEnd = this.canvas.width / 2 + this.startBtnWidth / 2;
    this.btnYStart = this.canvas.height / 2 - this.startBtnHeight / 2;
    this.btnYEnd = this.canvas.height / 2 + this.startBtnHeight / 2;
  }

  addStartBtn(callback: () => void) {
    if (!this.context || !this.textManager.getFontLoaded()) {
      return;
    }

    this.context.rect(
      this.btnXStart,
      this.btnYStart,
      this.startBtnWidth,
      this.startBtnHeight
    );
    this.context.lineWidth = 5;
    this.context.strokeStyle = this.colorManager.strokeColor;
    this.context.stroke();
    this.context.fillStyle = this.colorManager.fillColor;
    this.context.fill();

    this.context.font = "48px " + this.textManager.getFont();
    this.context.textAlign = "center";
    this.context.fillStyle = this.colorManager.strokeColor;
    this.context.fillText(
      this.startText,
      this.canvas.width / 2,
      this.canvas.height / 2 + this.startBtnHeight / 6
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
    const x = (event.x * parseInt(this.canvas.style.width)) / window.innerWidth;
    const y =
      (event.y * parseInt(this.canvas.style.height)) / window.innerHeight;

    console.log("click");
    console.log(this.canvas.style.marginLeft);
    console.log(y);
    // console.log(this.btnXStart);
    // console.log(this.btnXEnd);
    // console.log(this.btnYStart);
    // console.log(this.btnYEnd);

    if (!(this.btnXStart < x && x < this.btnXEnd)) {
      return false;
    }
    if (!(this.btnYStart < y && y < this.btnYEnd)) {
      return false;
    }
    return true;
  }
}
