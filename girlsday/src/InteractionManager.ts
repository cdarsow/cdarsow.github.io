import ColorManager from "./ColorManager";
import TextManager from "./TextManager";
export default class InteractionManager {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private colorManager: ColorManager;
  private textManager: TextManager;
  private startBtnWidth = 250;
  private startBtnHeight = 100;
  private btnXStart = 0;
  private btnXEnd = 0;
  private btnYStart = 0;
  private btnYEnd = 0;
  private startText = "Start";

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

  renderStartBtn() {
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
  }

  addStartBtnListener(callback: () => void) {
    const eventHandler = (event: MouseEvent) => {
      if (this.startBtnClicked(event)) {
        this.canvas.removeEventListener("mousedown", eventHandler);
        callback();
      }
    };

    this.canvas.addEventListener("mousedown", eventHandler);
  }

  addGameListener(callback: (column: number) => void) {
    const eventHandler = (event: MouseEvent) => {
      callback(this.determineClickedColumn(event));
    };

    this.canvas.addEventListener("mousedown", eventHandler);
  }

  private startBtnClicked(event: MouseEvent): boolean {
    const windowWidth = window.innerWidth;
    const canvasWidth = parseInt(this.canvas.style.width);
    const sizer = this.canvas.width / canvasWidth;

    let x = 0;
    let y = 0;
    if (windowWidth > canvasWidth) {
      x = (event.x - (windowWidth - canvasWidth) / 2) * sizer;
      y = event.y * sizer;
    } else {
      x = event.x * sizer;
      y = event.y * sizer;
    }

    if (!(this.btnXStart < x && x < this.btnXEnd)) {
      return false;
    }
    if (!(this.btnYStart < y && y < this.btnYEnd)) {
      return false;
    }
    return true;
  }

  private determineClickedColumn(event: MouseEvent): number {
    const windowWidth = window.innerWidth;
    const canvasWidth = parseInt(this.canvas.style.width);
    const columnWidth = this.canvas.width / 3;
    const sizer = this.canvas.width / canvasWidth;

    let x = 0;
    if (windowWidth > canvasWidth) {
      x = (event.x - (windowWidth - canvasWidth) / 2) * sizer;
    } else {
      x = event.x * sizer;
    }

    if (x < columnWidth) {
      return 0;
    }
    if (x > columnWidth * 2) {
      return 2;
    }
    return 1;
  }
}
