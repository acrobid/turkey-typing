<script setup lang="ts">
import { useTemplateRef } from "vue";
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
  closeDialog();
};

const dialogRef = useTemplateRef("dialogRef");

const closeDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.close();
  }
};

const openDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.showModal();
  }
};

defineExpose({
  openDialog,
  closeDialog,
});
</script>

<template>
  <dialog ref="dialogRef" class="dialog-overlay modal">
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
  </dialog>
</template>

<style scoped>
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
  background: #ff8c00;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #a09a45;
}

button:click {
  background: #9c782b;
}

.modal {
  display: none;
  transition-property: display, opacity;
  transition-behavior: allow-discrete;
  transition-duration: 0.3s;

  opacity: 0;
  background: white;
  color: #213547;
}

.modal[open] {
  display: block;
  @starting-style {
    opacity: 0;
  }
  opacity: 1;
}

.modal[open]::backdrop {
  display: none;
  /* background: rgba(0, 0, 0, 0.5); */
}

.modal {
  border: none;
  border-radius: 6px;
  padding: 0;
  max-width: 500px;
  width: 90%;
  margin: 0 auto;
  overflow-y: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal::backdrop {
  background: rgba(0, 0, 0, 0.5);
}
</style>
