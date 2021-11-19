<template>
  <div class="Home">
    <div class="level-option">
      <div class="select-subject">
        <select v-model="hskLevel" id="level-hsk">
          <option disabled default>HSK Level</option>
          <option :value="1">HSK 1</option>
          <option :value="2">HSK 2</option>
          <option :value="3">HSK 3</option>
          <option :value="4">HSK 4</option>
          <option :value="5">HSK 5</option>
          <option :value="6">HSK 6</option>
        </select>

        <button @click="fetchData">Search</button>
      </div>
    </div>

    <Card :word="words" :cardsLeft="cardsLeft" />

    <button @click="randomData" v-if="allWords.length != 0" class="random">
      Random New Word
    </button>
    <a
      :href="`https://www.mdbg.net/chinese/dictionary?wdqb=${words.chinese}`"
      rel="noopener noreferrer"
      target="_blank"
    >
      <button v-if="allWords.length != 0" class="mdbg">
        {{ words.chinese }} in MDBG Dictionary
      </button>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { db } from "@/firebase/app";
import firebase from "firebase";
import "firebase/firestore";

import Card from "@/components/Card.component.vue";

export default defineComponent({
  name: "Home",
  components: { Card },
  data() {
    return {
      words: {} as any,
      allWords: [] as any,
      hskLevel: "0",
      cardsLeft: 20,
    };
  },
  methods: {
    async fetchData() {
      try {
        if (this.hskLevel == this.words.level) {
          if (this.cardsLeft > 0) {
            alert("You choose the level same as before!");
            return;
          }
        }

        this.$store.state.isLoading = true;
        
        const totalWords = this.checkWords(this.hskLevel);
        const randomNum = this.getRandomIndices(totalWords);

        const snapshot = await Promise.all(
          randomNum.map((i) => {
            const snapshot = db
              .collection(`hsk${this.hskLevel}words`)
              .where("id", "==", i)
              .get();
            return snapshot;
          })
        );

        if (snapshot.length === 0) {
          this.$store.state.isLoading = false;
          return;
        }

        snapshot.forEach((word) => {
          this.allWords.push(word.docs[0].data());
        });

        this.randomData();

        this.$store.state.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },

    randomData() {
      if (this.cardsLeft === 0) return;

      const randomNumber = Math.floor(Math.random() * this.allWords.length);
      this.words = this.allWords[randomNumber];
      this.cardsLeft--;
    },

    getRandomIndices(words: number) {
      let a = [];
      for (let i = 0; i < 20; i++) {
        a.push(Math.round(Math.random() * words));
      }
      return a;
    },

    checkWords(hskLevel: string) {
      switch (hskLevel) {
        case "1":
          return 150;
        case "2":
          return 303;
        case "3":
          return 600;
        case "4":
          return 1200;
        case "5":
          return 2500;
        case "6":
          return 2500;
        default:
          return 0;
      }
    },
  },
});
</script>

<style scoped>
.Home {
  height: calc(100vh - 3.5rem);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
}

.level-option {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: 8px;
}
.select-subject {
  @apply m-2;
}

.select-subject select {
  @apply p-1 mx-0.5 transition-all;
  @apply border-2 rounded shadow-md;
  @apply focus:outline-none focus:ring-blue-500 focus:border-blue-700;
}

.select-subject button {
  @apply p-1 mx-0.5 transition-all;
  @apply transition-all px-2 py-2 rounded shadow-md text-white bg-blue-500 hover:bg-blue-700;
}

.random {
  @apply p-2 bg-green-500 hover:bg-green-700 m-5 rounded-lg text-white shadow-md transition-all;
}

.mdbg {
  @apply p-2 bg-blue-500 hover:bg-blue-700 rounded-lg text-white shadow-md transition-all;
}
</style>
