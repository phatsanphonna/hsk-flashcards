<template>
  <div class="Card">
    <h1>{{ word.chinese }}</h1>
    <h3>{{ word.pinyin }}</h3>
    <h5>{{ word.english }}</h5>

    <!-- for testing purpose -->
    <!-- <button @click="ImportData">Click</button> -->
    <p v-if="word.chinese !== undefined && cardsLeft > 0">{{ cardsLeft }} Cards Left</p>
    <p v-if="cardsLeft <= 0">No card left!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { importData } from "@/firebase/importData";

export default defineComponent({
  name: "Card",
  props: {
    word: Object,
    cardsLeft: Number,
  },
  methods: {
    async ImportData() {
      await importData();
    },
  },
});
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
  @apply text-5xl font-bold;
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