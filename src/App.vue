<script setup lang="ts">
import { ref, computed } from 'vue';
import AsciiTurkey from './components/AsciiTurkey.vue';
import FallingWord from './components/FallingWord.vue';
import GameOverDialog from './components/GameOverDialog.vue';
import { getRandomWord } from './utils/words';

const gameOver = ref(false);
const currentWords = ref<Array<{ id: number; word: string; typedLetters: number }>>([]);
const typedWords = ref<string[]>([]);
const score = ref(0);
const nextWordId = ref(0);
const turkeyFlipped = ref(false);

const addWord = () => {
  currentWords.value.push({
    id: nextWordId.value++,
    word: getRandomWord(),
    typedLetters: 0
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
      addWord();
    }
  }
};

const handleWordMissed = () => {
  turkeyFlipped.value = true;
  setTimeout(()=>
  gameOver.value = true, 2000)
};

const restartGame = () => {
  currentWords.value = [];
  typedWords.value = [];
  score.value = 0;
  turkeyFlipped.value = false;
  gameOver.value = false;
  nextWordId.value = 0;
  addWord();
};

// Start game
addWord();

// Add word every 5 seconds
setInterval(() => {
  if (!gameOver.value && currentWords.value.length < 5) {
    addWord();
  }
}, 5000);
</script>

<template>
  <div class="game-container" @keydown="handleKeyPress" tabindex="0" autofocus>
    <div class="score">Score: {{ score }}</div>
    
    <div class="game-area">
      <div class="words-container">
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
      v-if="gameOver"
      :score="score"
      :words-typed="typedWords"
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