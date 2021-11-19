<template>
  <Loading :isLoading="isLoading" />

  <Navbar />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { firebaseApp } from "@/firebase/app";
import { queryUser } from "@/firebase/database";

import Navbar from "@/components/Navbar.component.vue";
import Loading from "@/components/Loading.component.vue";

export default defineComponent({
  name: "App",
  components: { Navbar, Loading },
  data() {
    return {};
  },
  async created() {
    this.$store.state.isLoading = true;

    firebaseApp.auth().onAuthStateChanged(async (authUser) => {
      if (authUser === null) {
        await this.clearUserAuth();
      } else {
        await this.updateUserAuth(authUser);
      }

      this.$store.state.isLoading = false;
    });
  },
  methods: {
    updateUserAuth(authUser: any) {
      this.$store.dispatch("setAuthUser", authUser);
    },
    clearUserAuth() {
      this.$store.dispatch("clearAuthUser");
    },
  },
});
</script>

<style>
#app {
  font-family: "Noto Sans SC", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: #ffffff;
}

.disable-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
