<template>
  <div class="Card" v-if="Object.keys(word!).length !== 0">
    <h1>{{ props.word!.chinese }}</h1>
    <h3>{{ props.word!.pinyin }}</h3>
    <h5>{{ props.word!.english }}</h5>

    <!-- for testing purpose -->
    <!-- <button @click="ImportData">Click</button> -->

    <p
      v-if="props.word!.chinese !== undefined && props.cardsLeft! > 0"
    >{{ props.cardsLeft! }} Cards Left</p>
    <p v-if="props.cardsLeft! <= 0">No card left!</p>
  </div>
  <div v-else class="Card">
    <p>Select HSK Level</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({ word: Object, cardsLeft: Number })
</script>

<style scoped>
.Card {
  height: 300px;
  width: 200px;

  background-color: #c1ffe0;
  border-radius: 20px;
  @apply shadow-md;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.Card h1 {
  @apply text-4xl font-bold;
}

.Card h3 {
  @apply text-xl font-light;
}

.Card h5 {
  @apply text-2xl font-medium;
}

.Card p {
  @apply text-base font-thin;
}

.Card h1,
.Card h3,
.Card h5,
.Card p {
  margin: 0.1em;
}
</style>