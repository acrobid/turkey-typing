<script setup lang="ts">
import { ref, onMounted, nextTick, useTemplateRef } from "vue";
import AsciiTurkey from "./components/AsciiTurkey.vue";
import FallingWord from "./components/FallingWord.vue";
import GameOverDialog from "./components/GameOverDialog.vue";
import { getRandomWord } from "./utils/words";

const gameOver = ref(false);
const currentWords = ref<
  Array<{ id: number; word: string; typedLetters: number }>
>([]);
const typedWords = ref<string[]>([]);
const score = ref(0);
const nextWordId = ref(0);
const turkeyFlipped = ref(false);

const addWord = () => {
  currentWords.value.push({
    id: nextWordId.value++,
    word: getRandomWord(),
    typedLetters: 0,
  });
};

const handleKeyPress = (event: KeyboardEvent) => {
  if (gameOver.value) return;

  const activeWord = currentWords.value[0];
  if (!activeWord) return;

  if (event.key === activeWord.word[activeWord.typedLetters]) {
    activeWord.typedLetters++;

    if (activeWord.typedLetters === activeWord.word.length) {
      score.value += activeWord.word.length;
      typedWords.value.push(activeWord.word);
      currentWords.value.shift();
      if (currentWords.value.length === 0) addWord();
      startInterval();
    }
  }
};

const handleWordMissed = () => {
  turkeyFlipped.value = true;
  setTimeout(() => {
    gameOver.value = true;
    openDialog();
  }, 2000);
};

let wordInterval = ref(5000);
setInterval(() => {
  updateWordInterval();
}, 1000);

const updateWordInterval = () => {
  wordInterval.value = Math.max(400, wordInterval.value - 100);
};

let intervalId: number;

const startInterval = () => {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (!gameOver.value) {
      addWord();
    }
  }, wordInterval.value);
};

const restartGame = async () => {
  // wait 0.3 seconds
  await new Promise((resolve) => setTimeout(resolve, 300));
  currentWords.value = [];
  typedWords.value = [];
  gameOver.value = true;

  await nextTick();
  score.value = 0;
  turkeyFlipped.value = false;
  gameOver.value = false;
  nextWordId.value = 0;
  wordInterval.value = 5000;
  addWord();
  startInterval();
};

onMounted(() => {
  addWord();
  startInterval();
});

const dialogRef = useTemplateRef("dialogRef");

function openDialog() {
  if (!dialogRef.value) return;

  dialogRef.value.openDialog();
}
</script>

<template>
  <div class="game-container" @keydown="handleKeyPress" tabindex="0" autofocus>
    <div class="score">Score: {{ score }}</div>
    <button class="new-game-button" @click="restartGame">New Game</button>
    <div class="game-area">
      <div class="words-container" v-if="!gameOver">
        <FallingWord
          v-for="(word, index) in currentWords"
          :key="word.id"
          :word="word.word"
          :typed-letters="word.typedLetters"
          :speed="15"
          :is-active="index === 0"
          @word-missed="handleWordMissed"
        />
      </div>

      <div class="turkey-container">
        <AsciiTurkey :is-flipped="turkeyFlipped" />
      </div>
    </div>

    <GameOverDialog
      ref="dialogRef"
      :score="score"
      :words-typed="typedWords"
      :active-word="currentWords[0]?.word"
      @restart="restartGame"
    />
  </div>
</template>

<style>
.game-container {
  height: 100%;
  width: 100%;
  position: relative;
  outline: none;
  display: flex;
  flex-direction: column;
  background-color: #242424;
}

.game-area {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.score {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  font-weight: bold;
  z-index: 10;
}

.new-game-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #ff8c00;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  z-index: 10;
}

.words-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 100px;
  overflow: hidden;
}

.turkey-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
