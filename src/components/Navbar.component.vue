<template>
  <div class="Navbar disable-select">
    <h1 @click="() => this.$router.push({ path: '/' })">{{ title }}</h1>

    <div
      class="user"
      v-if="Object.keys(this.$store.getters.authUser).length !== 0"
    >
      <ul class="list">
        <li @click="handleSignOut" class="sign-out">
          <button>Sign Out</button>
        </li>
        <li>
          <img
            :src="this.$store.getters.authUser.photoURL"
            @click="handleImgClick"
            class="pfp"
          />
        </li>
      </ul>
    </div>

    <div class="user" v-else>
      <ul class="list">
        <li @click="handleSignIn" class="sign-in">
          <button>Sign In with Google</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

import {
  getRedirectResult,
  signInWithRedirect,
  signOut,
} from "@/firebase/auth";

export default defineComponent({
  name: "Navbar",
  data() {
    return {
      profilePicture: "",
      title: "HSK Flashcards",
      isPfpClick: false,
    };
  },
  methods: {
    handleImgClick() {
      this.$router.push({ path: "/me" });
    },

    async handleSignIn() {
      await signInWithRedirect();
      await getRedirectResult();
    },

    async handleSignOut() {
      await signOut();
      this.$router.push({ path: "/" });
    },
  },
  mounted() {
    setInterval(() => {
      if (this.title === "HSK Flashcards") {
        this.title = "HSK 抽认卡";
      } else {
        this.title = "HSK Flashcards";
      }
    }, 3000);
  },
});
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

.Navbar h1 {
  @apply font-bold hover:text-green-500 transition-all;
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
  @apply py-1 px-2 bg-green-500 text-white rounded-md shadow-lg;
  @apply hover:bg-green-700 transition-all;
}

.list .sign-out {
  @apply py-1 px-2 bg-red-500 text-white rounded-md shadow-lg;
  @apply hover:bg-red-700 transition-all;
}

.list button {
  @apply font-medium;
}
</style>