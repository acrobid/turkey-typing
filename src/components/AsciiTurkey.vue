<script setup lang="ts">
import { ref, watch } from "vue";
import confetti from "canvas-confetti";

const props = defineProps<{
  isFlipped: boolean;
}>();

const turkeyColor = ref("#8B4513");
const leftOrRight = ref("right");

function getRandomInterval(min: number, max: number) {
  const interval = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
  return interval;
}

let switchTimer: number | null = null;

function switchLeftOrRight() {
  leftOrRight.value = leftOrRight.value === "right" ? "left" : "right";
  if (switchTimer) clearTimeout(switchTimer);
  switchTimer = setTimeout(switchLeftOrRight, getRandomInterval(2, 7));
}

function startSwitching() {
  switchLeftOrRight();
}

startSwitching();

watch(
  () => props.isFlipped,
  (newValue) => {
    if (newValue === true) {
      turkeyColor.value = "red";
      confetti({
        particleCount: 1000,
        spread: 70,
        origin: { y: 0.8 },
        colors: ["#ff0000", "#ff4444", "#ff8888"],
        gravity: 1.5,
        scalar: 0.9,
      });
    } else {
      turkeyColor.value = "#8B4513";
    }
  },
);
</script>

<template>
  <div class="turkey-wrapper">
    <pre
      :class="{ 'turkey-flipped': isFlipped }"
      class="turkey"
      :style="{ color: turkeyColor }"
      v-if="leftOrRight === 'right' || isFlipped"
    >
                     .--.
    {\             / q {\
    { `\           \ (-(~`
   { '.{`\          \ \ )
   {'-{ ' \  .-""'-. \ \
   {._{'.' \/       '.) \
   {_.{.   {`            |
   {._{ ' {   ;'-=-.     |
    {-.{.' {  ';-=-.`    /
     {._.{.;    '-=-   .'
      {_.-' `'.__  _,-'
         jgs   |||`
              .='==,
    </pre>

    <pre
      :class="{ 'turkey-flipped': isFlipped }"
      class="turkey"
      :style="{ color: turkeyColor }"
      v-else
    >
               .--.
              /} p \             /}
             `~)-) /           /` }
              ( / /          /`}.' }
               / / .-'""-.  / ' }-'}
              / (.'       \/ '.'}_.}
             |            `}   .}._}
             |     .-=-';   } ' }_.}
             \    `.-=-;'  } '.}.-}
              '.   -=-'    ;,}._.}
                `-,_  __.'` '-._}
              jgs   `|||
                   .=='=,
    </pre>
  </div>
</template>

<style scoped>
.turkey-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.turkey {
  font-family: monospace;
  white-space: pre;
  color: #8b4513;
  transition: transform 0.5s;
  margin: 0;
}

.turkey-flipped {
  transform: rotate(180deg);
}
</style>
