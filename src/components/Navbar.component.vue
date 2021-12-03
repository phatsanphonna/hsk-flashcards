<template>
  <div class="Navbar disable-select">
    <div class="title">
      <router-link to="/">
        <h1>{{ title }}</h1>
      </router-link>

      <p v-if="store.getters.isLoading">
        <font-awesome-icon icon="circle-notch" size="lg" />
      </p>
    </div>

    <div class="user" v-if="Object.keys(store.getters.authUser).length !== 0">
      <ul class="list">
        <li @click="handleSignOut" class="sign-out">
          <button>Sign Out</button>
        </li>
        <li>
          <router-link to="/me">
            <img :src="store.getters.authUser.photoURL" class="pfp" />
          </router-link>
        </li>
      </ul>
    </div>

    <div class="user" v-else>
      <ul class="list">
        <li @click="handleSignIn" class="sign-in">
          <button>
            Sign In with
            <font-awesome-icon :icon="['fab', 'google']" size="md" />
            <!-- Sign In with Google -->
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onDeactivated } from 'vue'
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
import {
  getRedirectResult,
  signInWithRedirect,
  signOut
} from "@/firebase/auth";

const store = useStore()
const router = useRouter()

const isPfpClick = ref(false)

// Shuffle Title between English and Chinese
const title = ref("HSK Flashcards")

const shuffleTitle = setInterval(() => {
  if (title.value === "HSK Flashcards") {
    title.value = "HSK 抽认卡";
  } else {
    title.value = "HSK Flashcards";
  }
}, 3000)

onMounted(() => shuffleTitle)
onDeactivated(() => clearInterval(shuffleTitle))

// eslint-disable-next-line
function handleImgClick(): void {
  router.push({ path: "/me" });
}

// eslint-disable-next-line
function handleTitleClick() {
  router.push({ path: '/' })
}

async function handleSignIn(): Promise<void> {
  await signInWithRedirect();
  await getRedirectResult();
}

async function handleSignOut(): Promise<void> {
  await signOut();
  router.push({ path: "/" });
}
</script>

<style scoped>
.Navbar {
  height: 3.5rem;
  background-color: rgba(162, 255, 125, 0);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px;
}

.Navbar .title {
  @apply font-bold hover:text-green-500 transition-all;

  display: flex;
  flex-direction: row;
  justify-content: center;
}

.title p {
  @apply ml-2 animate-spin text-green-700;
}

.pfp {
  border-radius: 50%;

  @apply shadow-lg;
  @apply w-10 ml-4;

  color: black;
}

.list {
  flex-direction: row;
  display: flex;
  align-items: center;
}

.list li {
  text-align: center;

  display: inline-block;
}

.list .sign-in {
  @apply py-1 px-2 bg-green-700 text-white rounded-md shadow-lg;
  @apply hover:bg-yellow-600 transition-all;
}

.list .sign-out {
  @apply py-1 px-2 bg-red-500 text-white rounded-md shadow-lg;
  @apply hover:bg-red-700 transition-all;
}

.list button {
  @apply font-medium;
}
</style>