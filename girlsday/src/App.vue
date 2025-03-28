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

const canvas = useTemplateRef<HTMLCanvasElement>("canvas");

// Alter "canvasDims" to play around with the canvas's dimensions
const canvasDims = { width: 375, height: 650 };

function theatorFit() {
  if (!canvas.value) {
    return;
  }

  /*
  calculate dimensions for if the width was the screen width, and the height was still proportionate. This will be used in a later calculation.

  formula for getting new height using new width and aspect ratio:
  aspectRatio = oldHeight/oldWidth;
  newHeight = aspectRatio*newWidth;
  */
  const dims = {
    width: window.innerWidth,
    height: (canvasDims.height / canvasDims.width) * window.innerWidth,
  };
  console.log(dims);
  /* set aspect ratio in CSS. This ensures that the element is always a certain aspect ratio, even if width or height isn't given.

  aspect ratio is given by the formula: width/height = aspectRatio;
  */
  // console.log(canvas.value.style.aspectRatio);

  // canvas.value.style.aspectRatio = (
  //   canvasDims.width / canvasDims.height
  // ).toString();

  // console.log(canvas.value.style.aspectRatio);

  /*
  use "dims" to determine proper fit.

  If the screen height is more than the new canvas height when the width of the canvas is maximized, that means theres vertical space, and none of the height will be cut off, so we maximize the width, and set height to initial as to allow it to naturally conform to the aspect ratio (incase it was previously set to 100%).

Otherwise, if the new canvas height is more than the screen height, that means some of the canvas height will be cut off by the viewport, therefore we should maximize the height instead, and set the width to initial.
  */
  // if (window.innerHeight > dims.height) {
  //   console.log("ja");
  //   canvas.value.style.width = "100%";
  //   canvas.value.style.height = "initial";
  //   canvas.value.style.top = `calc(50% - ${dims.height + "px"}/2)`;
  // } else {
  //   canvas.value.style.height = "100%";
  //   canvas.value.style.width = "initial";
  //   canvas.value.style.top = "initial";
  // }

  canvas.value.style.height = window.innerHeight + "px";
  canvas.value.style.width =
    (window.innerHeight * canvasDims.width) / canvasDims.height + "px";
  canvas.value.style.aspectRatio = (
    (window.innerHeight * canvasDims.width) /
    canvasDims.height /
    window.innerHeight
  ).toString();
  // canvas.value.style.height = window.innerHeight + "px";
}

onMounted(() => {
  if (!canvas.value) {
    return;
  }
  const context: CanvasRenderingContext2D | null =
    canvas.value.getContext("2d");

  theatorFit();
  window.onresize = theatorFit;

  const someInfo = () => {
    console.log("mouse down");
  };
  canvas.value.addEventListener("mousedown", someInfo);

  let y = 0;
  let imageLoaded = false;

  function square() {
    if (!context) {
      return;
    }

    y += 1;
    context.beginPath();
    context.rect(25, y, 100, 100);
    context.lineWidth = 5;
    context.stroke();
    context.fillStyle = "teal";
    context.fill();
  }

  const rainbowImage = new Image();
  rainbowImage.src = rainbow;
  rainbowImage.addEventListener("load", () => {
    imageLoaded = true;
  });

  function renderBackground() {
    if (!context) {
      return;
    }
    if (imageLoaded) {
      context.drawImage(rainbowImage, 0, 0);
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
    square();
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
