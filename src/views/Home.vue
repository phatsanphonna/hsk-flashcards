<template>
  <div class="Home">
    <div class="level-option">
      <div class="select-subject">
        <select v-model="hskLevel" id="level-hsk">
          <option disabled default="true" value="0">HSK Level</option>
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

    <div v-if="allWords.length != 0" class="flex flex-col">
      <button @click="randomData" v-if="allWords.length != 0" class="random">Random New Word</button>
      <a
        :href="`https://www.mdbg.net/chinese/dictionary?wdqb=${words.chinese}`"
        rel="noopener noreferrer"
        target="_blank"
      >
        <button class="mdbg">{{ words.chinese }} in MDBG Dictionary</button>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { db } from "@/firebase/app";

import Card from "@/components/Card.component.vue";
import Word from "@/types/word.type";

export default defineComponent({
  name: "Home",
  components: { Card },
  data() {
    return {
      words: {} as Word,
      allWords: [] as any,
      alreadyRandomWords: [] as Word[],
      hskLevel: "0",
      cardsLeft: 20,
    };
  },
  methods: {
    /*
     * @ssuniie
     *
     * Get random words from firestore and random data.
     *
     * return {Promise<void>}
     */
    async fetchData(): Promise<void> {
      if (this.hskLevel === "0") return;

      if (Number(this.hskLevel) == this.words.level)
        if (this.cardsLeft > 0) return;

      this.$store.state.isLoading = true;

      try {
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

        if (snapshot.length === 0) return;

        this.allWords = [];

        snapshot.forEach((word) => {
          this.allWords.push(word.docs[0].data());
        });

        this.cardsLeft = 20;
        this.alreadyRandomWords = [];

        this.randomData();
      } catch (err) {
        console.log(err);
        this.$store.state.error = { isError: true, text: err };
      } finally {
        this.$store.state.isLoading = false;
      }
    },

    /*
     * @ssuniie
     *
     * Random data in list of allWords
     *
     * return {void}
     */
    randomData(): void {
      if (this.cardsLeft === 0) return;

      const randomNumber = Math.floor(Math.random() * this.allWords.length);

      if (this.alreadyRandomWords.includes(this.allWords[randomNumber])) {
        this.randomData();
      } else {
        this.words = this.allWords[randomNumber];
        this.alreadyRandomWords.push(this.words);
        this.cardsLeft--;
      }
    },

    /*
     * @ssuniie
     *
     * Get random numbers to random data from firestore database
     *
     * return {number[]}
     */
    getRandomIndices(words: number): number[] {
      let a = [];
      for (let i = 0; i < 20; i++) {
        a.push(Math.round(Math.random() * words));
      }
      return a;
    },

    /*
     * @ssuniie
     *
     * Get total words of HSK Level
     *
     * param {string} hskLevel
     * return {number} 150 | 303 | 600 | 1200 | 2500 | 0
     */
    checkWords(hskLevel: string): 150 | 303 | 600 | 1200 | 2500 | 0 {
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
  height: calc(100vh - 3.5rem - 3rem);

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
