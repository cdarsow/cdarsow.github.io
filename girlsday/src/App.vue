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
import rainbow from "@/images/rainbow.png";
import monster from "@/images/monster.png";
import coolFont from "@/fonts/Knewave-Regular.ttf";

const canvas = useTemplateRef<HTMLCanvasElement>("canvas");

// Alter "canvasDims" to play around with the canvas's dimensions
const canvasDims = { width: 375, height: 650 };

function theatorFit() {
  if (!canvas.value) {
    return;
  }

  canvas.value.style.height = window.innerHeight + "px";
  canvas.value.style.width =
    (window.innerHeight * canvasDims.width) / canvasDims.height + "px";
  canvas.value.style.aspectRatio = (
    (window.innerHeight * canvasDims.width) /
    canvasDims.height /
    window.innerHeight
  ).toString();
}

onMounted(() => {
  if (!canvas.value) {
    return;
  }
  const context: CanvasRenderingContext2D | null =
    canvas.value.getContext("2d");

  const title = "MagicMonster";
  function addText() {
    if (!context || !canvas.value) {
      return;
    }

    context.font = "48px myCoolFont";
    context.lineWidth = 5;

    context.strokeStyle = "#00ff00";

    context.textAlign = "center"; // center text

    context.strokeText(title, canvas.value.width / 2, 100);

    context.fillStyle = "#ff00ff";
    context.fillText(title, canvas.value.width / 2, 100);
  }

  const f = new FontFace("myCoolFont", `url(${coolFont})`);

  f.load().then((font) => {
    document.fonts.add(font);
    console.log("font loaded");
    addText();
  });

  theatorFit();
  window.onresize = theatorFit;

  const someInfo = () => {
    console.log("mouse down");
  };
  canvas.value.addEventListener("mousedown", someInfo);

  let y = 0;
  let x = 50;
  let stepCounter = 0;
  const realSpeed = 5;
  let speed = realSpeed;
  let imageLoaded1 = false;
  let imageLoaded2 = false;

  function drawMonster() {
    if (!context) {
      return;
    }
    if (!imageLoaded2) {
      return;
    }

    stepCounter++;
    if (stepCounter > 200 / realSpeed) {
      if (speed > 0) {
        speed = -1 * realSpeed;
      } else {
        speed = realSpeed;
      }
      stepCounter = 0;
    }

    x += speed;
    context.drawImage(monsterImage, x, 500);
  }

  const rainbowImage = new Image();
  rainbowImage.src = rainbow;
  rainbowImage.addEventListener("load", () => {
    imageLoaded1 = true;
  });

  const monsterImage = new Image();
  monsterImage.src = monster;
  monsterImage.addEventListener("load", () => {
    imageLoaded2 = true;
  });

  function renderBackground() {
    if (!context) {
      return;
    }
    if (imageLoaded1) {
      context.drawImage(rainbowImage, 0, 200);
    }
  }

  function startFrames() {
    if (!canvas.value || !context) {
      return;
    }

    // erase entire canvas
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);

    // render each type of entity in order, relative to layers
    renderBackground();
    drawMonster();
    addText();
    // square();
    // renderProps();
    // renderCharacters();
    // renderControls();

    // rerun function (call next frame)
    window.requestAnimationFrame(startFrames);
  }

  startFrames();
});
</script>
<style src="./styles/game.css"></style>
