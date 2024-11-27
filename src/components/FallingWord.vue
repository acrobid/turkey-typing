<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps<{
  word: string;
  typedLetters: number;
  speed: number;
  isActive: boolean;
}>();

const emit = defineEmits<{
  wordMissed: [];
}>();

const wordElement = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (wordElement.value) {
    const startX = Math.random() * (window.innerWidth - 200);
    wordElement.value.style.left = `${startX}px`;
  }
});
</script>

<template>
  <div
    ref="wordElement"
    class="falling-word"
    :class="{ 'active-word': isActive }"
    :style="{ animationDuration: `${speed}s` }"
    @animationend="emit('wordMissed')"
  >
    <span
      v-for="(letter, index) in word"
      :key="word"
      :class="{
        typed: index < typedLetters,
        'current-letter': index === typedLetters && isActive,
      }"
    >
      {{ letter }}
    </span>
  </div>
</template>

<style scoped>
.falling-word {
  position: absolute;
  font-size: 24px;
  font-family: "Courier New", monospace;
  top: 0;
  white-space: nowrap;
  will-change: transform;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
  animation: fall linear forwards;
}

@keyframes fall {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(100vh - 150px));
  }
}

.active-word {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

.typed {
  color: #4caf50;
}

.current-letter {
  position: relative;
}

.current-letter::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ffa500;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
