<template>
  <div>
    <canvas
      ref="canvas"
      :width="canvasDims.width"
      :height="canvasDims.height"
    ></canvas>
  </div>
</template>
<script setup lang="ts">
import { useTemplateRef, onMounted } from "vue";
import CanvasManager from "./CanvasManager";
import ImageLoader from "./ImageLoader";
import SpriteFactory from "./SpriteFactory";
import TextManager from "./TextManager";
import BackgroundManager from "./BackgroundManager";
import CharacterManager from "./CharacterManager";
import ColorManager from "./ColorManager";
import InteractionManager from "./InteractionManager";
import background from "@/images/bg.jpg";
import character from "@/images/monster.png";
import pineapple from "@/images/pineapple.png";
import strawberry from "@/images/strawberry.png";

const canvas = useTemplateRef<HTMLCanvasElement>("canvas");
const canvasDims = { width: 750, height: 1300 };

let imageLoader: ImageLoader;
let canvasManager: CanvasManager;
let spriteFactory: SpriteFactory;
let textManager: TextManager;
let backgroundManager: BackgroundManager;
let characterManager: CharacterManager;
let interactionManager: InteractionManager;
let colorManager: ColorManager;
let points = 0;
let currentColumn = 1;
let gameStarted = false;

onMounted(() => {
  if (!canvas.value) {
    return;
  }

  const context = canvas.value.getContext("2d");
  if (!context) {
    return;
  }

  imageLoader = new ImageLoader();
  canvasManager = new CanvasManager(canvas.value, canvasDims);
  colorManager = new ColorManager();
  textManager = new TextManager(canvas.value, colorManager);
  characterManager = new CharacterManager(canvas.value, imageLoader, character);
  spriteFactory = new SpriteFactory(
    [pineapple, strawberry],
    [30, 60],
    imageLoader,
    canvas.value
  );
  interactionManager = new InteractionManager(
    canvas.value,
    colorManager,
    textManager
  );
  backgroundManager = new BackgroundManager(
    canvas.value,
    imageLoader,
    background
  );

  const theatorFit = () => {
    canvasManager.theatorFit();
  };
  window.onresize = theatorFit;

  imageLoader.addImage(background, () => {
    backgroundManager.render();
  });
  imageLoader.addImage(character, () => {
    characterManager.renderIntro();
  });
  imageLoader.addImage(pineapple);
  imageLoader.addImage(strawberry);

  const startGame = () => {
    spriteFactory.start();
    interactionManager.addGameHandler((column: number) => {
      currentColumn = column;
    });
    gameStarted = true;
  };

  const renderGame = () => {
    if (!canvas.value || !context) {
      return;
    }

    context.clearRect(0, 0, canvas.value.width, canvas.value.height);

    backgroundManager.render();
    if (!gameStarted) {
      characterManager.renderIntro();
      textManager.renderGameName();
      interactionManager.addStartBtn(startGame);
      textManager.renderPoints(points);
    } else {
      characterManager.gotoColumn(currentColumn);
      spriteFactory.render();
      textManager.renderPoints(points);
    }
    window.requestAnimationFrame(renderGame);
  };

  imageLoader.loadImages(() => {
    renderGame();
    interactionManager.addStartBtn(startGame);
  });
});
</script>
<style src="./styles/game.css"></style>
