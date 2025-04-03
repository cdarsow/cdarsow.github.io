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
import background from "@/images/wasserfallTest.jpg";
import character from "@/images/monkey.png";
import gegenstand1 from "@/images/sprite1.png";
import gegenstand2 from "@/images/sprite2.png";
import gegenstand3 from "@/images/sprite3.png";

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
// Einstellen der Spieldauer in Sekunden
const secondsToPlay = 5;
let secondsLeft = secondsToPlay;
// Gegenstaende, die runterfallen
const gegenstaende = [gegenstand1, gegenstand2, gegenstand3];
// Werte der Gegenstaende, die runterfallen
const gegenstandWerte = [5, 10, -20];

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
    gegenstaende,
    gegenstandWerte,
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
  gegenstaende.forEach((gegenstand) => {
    imageLoader.addImage(gegenstand);
  });

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
    if (!gameStarted) {
      characterManager.renderIntro();
      textManager.renderGameName();
      textManager.renderInfo();
      interactionManager.renderStartBtn();
    } else {
      characterManager.gotoColumn(currentColumn);
      spriteFactory.render();
    }
    textManager.renderScore(score);
    textManager.renderTimer(secondsLeft);
    window.requestAnimationFrame(renderGame);
  };

  imageLoader.loadImages(() => {
    renderGame();
  });
});
</script>
<style src="./styles/game.css"></style>
