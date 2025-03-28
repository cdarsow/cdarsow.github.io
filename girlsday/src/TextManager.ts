import gameFont from "@/fonts/Knewave-Regular.ttf";
import ColorManager from "./ColorManager";

export default class TextManager {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private fontLoaded = false;
  private fontName = "gameFont";
  private gameName = "MagicMonster";
  private colorManager: ColorManager;

  constructor(canvas: HTMLCanvasElement, colorManager: ColorManager) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.colorManager = colorManager;
    this.loadFont();
  }

  private loadFont() {
    const font = new FontFace(this.fontName, `url(${gameFont})`);
    font.load().then((font) => {
      document.fonts.add(font);
      this.fontLoaded = true;
      this.renderGameName();
    });
  }

  renderGameName() {
    if (!this.context || !this.fontLoaded) {
      return;
    }

    this.context.font = "88px " + this.fontName;
    this.context.textAlign = "center";

    this.context.lineWidth = 5;
    this.context.strokeStyle = this.colorManager.strokeColor;
    this.context.strokeText(this.gameName, this.canvas.width / 2, 250);

    this.context.fillStyle = this.colorManager.fillColor;
    this.context.fillText(this.gameName, this.canvas.width / 2, 250);
  }

  renderPoints(points: number = 0) {
    if (!this.context || !this.fontLoaded) {
      return;
    }

    this.context.font = "48px " + this.fontName;
    this.context.textAlign = "center";
    this.context.fillStyle = this.colorManager.pointColor;
    this.context.fillText("Punkte: " + points, this.canvas.width / 2, 100);
  }

  getFont() {
    return this.fontName;
  }

  getFontLoaded() {
    return this.fontLoaded;
  }
}
