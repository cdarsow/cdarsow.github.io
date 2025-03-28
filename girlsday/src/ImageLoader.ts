type callbackFunc = () => void;

export default class ImageLoader {
  private imagePaths: string[] = [];
  private images: Record<string, HTMLImageElement> = {};
  private callbacks: callbackFunc[] = [];
  private loadedCounter = 0;

  addImage(path: string, callback: callbackFunc = () => {}) {
    this.imagePaths.push(path);
    this.callbacks.push(callback);
  }

  loadImages(callback: callbackFunc) {
    this.imagePaths.forEach((imagePath, index) => {
      this.images[imagePath] = new Image();
      this.images[imagePath].src = imagePath;
      this.images[imagePath].addEventListener("load", () => {
        this.loadedCounter++;
        this.callbacks[index]();
        if (this.loadedCounter === this.imagePaths.length) {
          callback();
        }
      });
    });
  }

  getImage(path: string): HTMLImageElement {
    return this.images[path];
  }
}
