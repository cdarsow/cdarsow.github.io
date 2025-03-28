<template>
  <div>
    <h1>Unser spiel</h1>
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script setup lang="ts">
import { useTemplateRef, onMounted } from "vue";
import rainbow from "@/images/rainbow.png";

const canvas = useTemplateRef<HTMLCanvasElement>("canvas");

onMounted(() => {
  if (!canvas.value) {
    return;
  }
  const context: CanvasRenderingContext2D | null =
    canvas.value.getContext("2d");

  const someInfo = () => {
    console.log("mouse down");
  };
  canvas.value.addEventListener("mousedown", someInfo);
  function square() {
    if (!context) {
      return;
    }
    context.rect(100, 25, 100, 100);
    context.lineWidth = 5;
    context.stroke();
    context.fillStyle = "teal";
    context.fill();
  }

  square();

  function drawImage() {
    if (!context) {
      return;
    }
    const rainbowImage = new Image(640, 320);
    rainbowImage.src = rainbow;
    rainbowImage.addEventListener("load", () => {
      context.drawImage(rainbowImage, 0, 0);
    });
  }

  drawImage();
});
</script>
<style src="./styles/game.css"></style>
