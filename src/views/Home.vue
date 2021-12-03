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

        <button @click="handleSearch">Search</button>
      </div>
    </div>

    <Card :word="word" :cardsLeft="cardsLeft" />

    <div v-if="allWords.length != 0" class="flex flex-col">
      <button @click="randomData" v-if="allWords.length != 0" class="random">Random New Word</button>
      <a
        :href="`https://www.mdbg.net/chinese/dictionary?wdqb=${word!.chinese}`"
        rel="noopener noreferrer"
        target="_blank"
      >
        <button class="mdbg">{{ word!.chinese }} in MDBG Dictionary</button>
      </a>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { useStore } from "vuex";
import { db } from "@/firebase/app";

import Card from "@/components/Card.component.vue";
import Word from "@/types/word.type";
import { HskLevel, HskWords } from "@/types/hskLevel.type";

const store = useStore()

const word = ref<Word | any>({})
const allWords = ref<Word[] | any>([])
const alreadyRandomWords = ref<Word[]>([])
const hskLevel = ref<HskLevel>("0")
const cardsLeft = ref(20)

/*
 * Random data in list of allWords
 *
 * return {void}
 */
const randomData = (): void => {
  if (cardsLeft.value === 0) return;

  const randomNumber = Math.floor(Math.random() * allWords.value.length);

  if (alreadyRandomWords.value.includes(allWords.value[randomNumber])) {
    randomData();
  } else {
    word.value = allWords.value[randomNumber];
    alreadyRandomWords.value.push(word.value);
    cardsLeft.value--;
  }
}


async function handleSearch() {
  /**
   * Get total words of HSK Level
   *
   * @param {string} hskLevel: HskLevel
   * @return {number} HskWords
   */
  const checkWords = (hskLevel: HskLevel): HskWords => {
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
  }

  /**
   * Get random numbers to random data from firestore
   *
   * @param {number} words
   * @return {number[]}
   */
  const getRandomIndices = (words: number): number[] => {
    let a: number[] = []

    for (let i = 0; i < 20; i++) {
      a.push(Math.round(Math.random() * words));
    }

    return a;
  }

  /**
   * Set cardsLeft, allWords, alreadyRandomWords to default state.
   *
   * @return {number[]}
   */
  const setDefaultValue = (): void => {
    cardsLeft.value = 20;
    allWords.value = [];
    alreadyRandomWords.value = [];
  }

  /**
   * Get random words from firestore and random data.
   *
   * @return {Promise<void>}
   */
  const fetchData = async (): Promise<void> => {
    try {
      const totalWords = checkWords(hskLevel.value);
      const randomNum = getRandomIndices(totalWords);

      const snapshot = await Promise.all(
        randomNum.map((i) => {
          const snapshot = db
            .collection(`hsk${hskLevel.value}words`)
            .where("id", "==", i)
            .get();
          return snapshot;
        })
      );

      if (snapshot.length === 0) return;

      setDefaultValue()

      snapshot.forEach((word) => {
        allWords.value.push(word.docs[0].data());
      });
    } catch (err) {
      console.log(err);

      store.dispatch('setError', { isError: true, text: err });
      store.dispatch('setLoading', false);
    }
  }

  if (hskLevel.value === "0") return;

  if (Number(hskLevel.value) == word.value!.level) {
    if (cardsLeft.value > 0) return
  }

  store.dispatch('setLoading', true);

  await fetchData()
  randomData()

  store.dispatch('setLoading', false);
}
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
