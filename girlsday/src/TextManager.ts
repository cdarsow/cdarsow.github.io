import gameFont from "@/fonts/Knewave-Regular.ttf";

export default class TextManager {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private fontLoaded = false;
  private fontName = "gameFont";
  private gameName = "MagicMonsterrrr";
  private color1 = "#00ff00";
  private color2 = "#ff00ff";
  private color3 = "#000000";

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
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

    this.context.font = "40px " + this.fontName;
    this.context.textAlign = "center";

    this.context.lineWidth = 5;
    this.context.strokeStyle = this.color1;
    this.context.strokeText(this.gameName, this.canvas.width / 2, 100);

    this.context.fillStyle = this.color2;
    this.context.fillText(this.gameName, this.canvas.width / 2, 100);
  }

  renderPoints(points: number = 0) {
    if (!this.context || !this.fontLoaded) {
      return;
    }

    this.context.font = "24px " + this.fontName;
    this.context.textAlign = "center";
    this.context.fillStyle = this.color3;
    this.context.fillText("Punkte: " + points, this.canvas.width / 2, 200);
  }
}
