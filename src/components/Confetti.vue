<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const confettiContainer = ref<HTMLDivElement | null>(null);

const createConfettiPiece = () => {
  const piece = document.createElement('div');
  piece.className = 'confetti-piece';
  piece.style.backgroundColor = ['#FF0000', '#FF5555', '#FF8888'][Math.floor(Math.random() * 3)];
  piece.style.left = '50%';
  piece.style.top = '50%';
  return piece;
};

const animateConfetti = (piece: HTMLDivElement) => {
  const angle = Math.random() * Math.PI * 2;
  const velocity = 100 + Math.random() * 200;
  const rotation = Math.random() * 720 - 360;
  
  gsap.to(piece, {
    x: Math.cos(angle) * velocity,
    y: Math.sin(angle) * velocity,
    rotation: rotation,
    opacity: 0,
    duration: 2,
    ease: 'power1.out',
    onComplete: () => piece.remove()
  });
};

const spawnConfetti = () => {
  if (!confettiContainer.value) return;
  
  for (let i = 0; i < 5000; i++) {
    const piece = createConfettiPiece();
    confettiContainer.value.appendChild(piece);
    animateConfetti(piece);
  }
};

defineExpose({ spawnConfetti });
</script>

<template>
  <div ref="confettiContainer" class="confetti-container"></div>
</template>

<style scoped>
.confetti-container {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.confetti-piece {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  will-change: transform;
}
</style>