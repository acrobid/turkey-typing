<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const props = defineProps<{
  word: string;
  typedLetters: number;
  speed: number;
  isActive: boolean;
}>();

const emit = defineEmits<{
  wordMissed: [];
}>();

const wordElement = ref<HTMLDivElement | null>(null);
let animation: gsap.core.Tween;

onMounted(() => {
  if (wordElement.value) {
    const startX = Math.random() * (window.innerWidth - 200);
    wordElement.value.style.left = `${startX}px`;
    wordElement.value.style.transform = 'translateY(0)';
    
    animation = gsap.fromTo(wordElement.value,
      { y: 0 },
      {
        y: window.innerHeight - 150,
        duration: props.speed,
        ease: 'none',
        onComplete: () => emit('wordMissed')
      }
    );
  }
});

onUnmounted(() => {
  if (animation) {
    animation.kill();
  }
});
</script>

<template>
  <div ref="wordElement" class="falling-word" :class="{ 'active-word': isActive }">
    <span
      v-for="(letter, index) in word"
      :key="index"
      :class="{
        'typed': index < typedLetters,
        'current-letter': index === typedLetters && isActive
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
  font-family: 'Courier New', monospace;
  top: 0;
  white-space: nowrap;
  will-change: transform;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.active-word {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

.typed {
  color: #4CAF50;
}

.current-letter {
  position: relative;
}

.current-letter::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #FFA500;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>