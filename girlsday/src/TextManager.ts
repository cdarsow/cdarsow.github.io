// Schrift die wir benutzen wollen
import gameFont from "@/fonts/Hanalei-Regular.ttf";
import ColorManager from "./ColorManager";

export default class TextManager {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private colorManager: ColorManager;
  private fontLoaded = false;
  // Auswahl der Schrift, z.B. gameFont oder sans-serif
  private fontName = "sans-serif";
  // hier kann man den Namen vom Spiel anpassen
  private gameName = "Ein Spiel";
  // hier kann man eine Information eingeben
  private info = "vom GirlsDay";
  // Score Info
  private score = "Score: ";
  // Zeit Info
  private time = "Time: ";

  constructor(canvas: HTMLCanvasElement, colorManager: ColorManager) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.colorManager = colorManager;
    this.loadFont();
  }

  private loadFont() {
    const font = new FontFace("gameFont", `url(${gameFont})`);
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

  renderScore(score: number = 0) {
    if (!this.context || !this.fontLoaded) {
      return;
    }

    this.context.font = "48px " + this.fontName;
    this.context.textAlign = "left";
    this.context.fillStyle = this.colorManager.standardColor;
    this.context.fillText(this.score + score, 50, 100);
  }

  renderTimer(secondsLeft: number) {
    if (!this.context || !this.fontLoaded) {
      return;
    }

    this.context.font = "48px " + this.fontName;
    this.context.textAlign = "right";
    this.context.fillStyle = this.colorManager.standardColor;
    this.context.fillText(this.time + secondsLeft, this.canvas.width - 50, 100);
  }

  renderInfo() {
    if (!this.context || !this.fontLoaded) {
      return;
    }

    this.context.font = "24px " + this.fontName;
    this.context.textAlign = "center";
    this.context.fillStyle = this.colorManager.standardColor;
    this.context.fillText(this.info, this.canvas.width / 2, 300);
  }

  getFont() {
    return this.fontName;
  }

  getFontLoaded() {
    return this.fontLoaded;
  }
}
