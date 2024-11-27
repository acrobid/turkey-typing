<script setup lang="ts">
defineProps<{
  score: number;
  wordsTyped: string[];
  activeWord: string;
}>();

const emit = defineEmits<{
  restart: [];
}>();

const handleRestart = () => {
  emit("restart");
  // Use nextTick to ensure the game container is ready after state updates
  setTimeout(() => {
    const gameContainer = document.querySelector(
      ".game-container",
    ) as HTMLElement;
    if (gameContainer) {
      gameContainer.focus();
    }
  }, 0);
};
</script>

<template>
  <div class="dialog-overlay">
    <div class="dialog">
      <h2>{{ activeWord }} killed the turkey!</h2>
      <p>Score: {{ score }}</p>
      <div class="words-typed">
        <h3>Words Typed:</h3>
        <ul>
          <li v-for="word in wordsTyped" :key="word">{{ word }}</li>
        </ul>
      </div>
      <button @click="handleRestart">Play Again</button>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  color: #333;
  text-align: center;
}

.words-typed {
  max-height: 200px;
  overflow-y: auto;
  margin: 1rem 0;
}

button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #45a049;
}
</style>
