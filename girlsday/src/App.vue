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
import ImageLoader from "./ImageLoader";
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

  function addPoints() {
    if (!context || !canvas.value) {
      return;
    }

    context.font = "24px myCoolFont";
    context.textAlign = "center"; // center text
    context.fillStyle = "#000000";
    context.fillText("Punkte: 12", canvas.value.width / 2, 200);
  }

  const f = new FontFace("myCoolFont", `url(${coolFont})`);

  f.load().then((font) => {
    document.fonts.add(font);
    console.log("font loaded");
    addText();
    addPoints();
  });

  function renderBackground() {
    if (!context) {
      return;
    }

    context.drawImage(imageLoader.getImage(rainbow), 0, 200);
  }

  const imagesReady = () => {
    console.log("game ready to start");
    startFrames();
  };
  const imageLoader = new ImageLoader();
  imageLoader.addImage(rainbow, () => {
    renderBackground();
  });
  imageLoader.addImage(monster, () => {
    console.log("monster 1");
  });

  imageLoader.loadImages(imagesReady);

  theatorFit();
  window.onresize = theatorFit;

  const someInfo = () => {
    console.log("mouse down");
  };
  canvas.value.addEventListener("mousedown", someInfo);

  // let y = 0;
  let x = 50;
  let stepCounter = 0;
  const realSpeed = 5;
  let speed = realSpeed;

  function drawMonster() {
    if (!context) {
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
    context.drawImage(imageLoader.getImage(monster), x, 500);
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
    addPoints();
    // square();
    // renderProps();
    // renderCharacters();
    // renderControls();

    // rerun function (call next frame)
    window.requestAnimationFrame(startFrames);
  }

  // startFrames();
});
</script>
<style src="./styles/game.css"></style>
