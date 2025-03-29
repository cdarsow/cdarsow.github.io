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
import InteractionManager from "./InteractionManager";
import background from "@/images/rainbow.png";
import character from "@/images/monster.png";

const canvas = useTemplateRef<HTMLCanvasElement>("canvas");
const canvasDims = { width: 375, height: 650 };

let imageLoader: ImageLoader;
let canvasManager: CanvasManager;
let spriteFactory: SpriteFactory;
let textManager: TextManager;
let backgroundManager: BackgroundManager;
let characterManager: CharacterManager;
let interactionManager: InteractionManager;
let points = 0;

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
  textManager = new TextManager(canvas.value);
  characterManager = new CharacterManager(canvas.value, imageLoader, character);
  spriteFactory = new SpriteFactory([character], imageLoader, canvas.value);
  interactionManager = new InteractionManager(canvasManager);
  backgroundManager = new BackgroundManager(
    canvas.value,
    imageLoader,
    background
  );

  imageLoader.addImage(background, () => {
    backgroundManager.render();
  });
  imageLoader.addImage(character, () => {
    characterManager.renderIntro();
  });
  imageLoader.loadImages(() => {
    spriteFactory.start();
    startFrames();
  });

  function startFrames() {
    if (!canvas.value || !context) {
      return;
    }

    context.clearRect(0, 0, canvas.value.width, canvas.value.height);
    backgroundManager.render();
    characterManager.renderIntro();
    spriteFactory.render();
    textManager.renderPoints(points);

    // window.requestAnimationFrame(startFrames);
  }
});
</script>
<style src="./styles/game.css"></style>
