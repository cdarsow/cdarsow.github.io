import type CharacterManager from "./CharacterManager";
import ImageLoader from "./ImageLoader";
import Sprite from "./Sprite";

export default class SpriteFactory {
  private types: string[] = [];
  private values: number[] = [];
  private imageLoader: ImageLoader;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private sprites: Sprite[] = [];
  private speed = 5;
  private characterManager: CharacterManager;
  private scoreCallback: (points: number) => void;

  constructor(
    types: string[],
    values: number[],
    imageLoader: ImageLoader,
    canvas: HTMLCanvasElement,
    characterManager: CharacterManager,
    scoreCallback: (points: number) => void
  ) {
    this.types = types;
    this.values = values;
    this.imageLoader = imageLoader;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.characterManager = characterManager;
    this.scoreCallback = scoreCallback;
  }

  start() {
    const getRandomInt = (min: number, max: number) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const createSprite = () => {
      if (!this.context) {
        return;
      }

      const random = getRandomInt(0, this.types.length - 1);
      const sprite = new Sprite(
        this.types[random],
        this.imageLoader,
        this.context,
        (getRandomInt(0, 2) * this.canvas.width) / 3 + 50,
        0,
        this.values[random],
        this.speed
      );
      this.sprites.push(sprite);
    };
    setInterval(createSprite, 1250);
  }

  render() {
    this.sprites.forEach((sprite) => {
      const info = sprite.render();
      this.checkOutOfView(info);
      this.checkCollision(info, this.characterManager.getInfo());
    });
  }

  private checkOutOfView(info: { x: number; y: number; w: number; h: number }) {
    if (info.y > this.canvas.height) {
      this.sprites.splice(0, 1);
    }
  }

  private checkCollision(
    sprite: { x: number; y: number; w: number; h: number; value: number },
    character: { x: number; y: number; w: number; h: number }
  ) {
    if (!(sprite.y + sprite.h > character.y)) {
      return;
    }
    if (
      !(
        sprite.x + sprite.w > character.x &&
        sprite.x < character.x + character.w
      )
    ) {
      return;
    }

    this.sprites.splice(0, 1);
    this.scoreCallback(sprite.value);
  }
}
