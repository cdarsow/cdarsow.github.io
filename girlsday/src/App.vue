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
import lemon from "@/images/lemon.png";

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
let score = 0;
let currentColumn = 1;
let gameStarted = false;
const secondsToPlay = 60;
let secondsLeft = secondsToPlay;

onMounted(() => {
  if (!canvas.value) {
    return;
  }

  const context = canvas.value.getContext("2d");
  if (!context) {
    return;
  }

  const scoreUpdate = (points: number) => {
    score = score + points;
  };
  imageLoader = new ImageLoader();
  canvasManager = new CanvasManager(canvas.value, canvasDims);
  colorManager = new ColorManager();
  textManager = new TextManager(canvas.value, colorManager);
  characterManager = new CharacterManager(canvas.value, imageLoader, character);
  spriteFactory = new SpriteFactory(
    [pineapple, strawberry, lemon],
    [10, 5, -20],
    imageLoader,
    canvas.value,
    characterManager,
    scoreUpdate
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
  imageLoader.addImage(lemon);

  const startGame = () => {
    gameStarted = true;
    spriteFactory.start();
    score = 0;
    secondsLeft = secondsToPlay;
    interactionManager.addGameListener((column: number) => {
      currentColumn = column;
    });

    const timerInterval = setInterval(() => {
      secondsLeft = secondsLeft - 1;
      if (secondsLeft === 0) {
        clearInterval(timerInterval);
        prepareGame();
      }
    }, 1000);
  };

  const prepareGame = () => {
    gameStarted = false;
    interactionManager.addStartBtnListener(startGame);
    spriteFactory.stop();
  };
  prepareGame();

  const renderGame = () => {
    if (!canvas.value || !context) {
      return;
    }

    context.clearRect(0, 0, canvas.value.width, canvas.value.height);

    backgroundManager.render();
    textManager.renderScore(score);
    textManager.renderTimer(secondsLeft);

    if (!gameStarted) {
      characterManager.renderIntro();
      textManager.renderGameName();
      textManager.renderInfo();
      interactionManager.renderStartBtn();
    } else {
      characterManager.gotoColumn(currentColumn);
      spriteFactory.render();
    }
    window.requestAnimationFrame(renderGame);
  };

  imageLoader.loadImages(() => {
    renderGame();
  });
});
</script>
<style src="./styles/game.css"></style>
