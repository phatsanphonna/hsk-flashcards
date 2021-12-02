<template>
  <Loading />
  <Error />

  <div class="container mx-auto">
    <Navbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { firebaseApp } from "@/firebase/app";
import { queryUser } from "./firebase/database";

import Navbar from "@/components/Navbar.component.vue";
import Footer from "@/components/Footer.component.vue";
import Loading from "@/components/Loading.component.vue";
import Error from "@/components/Error.component.vue";

const store = useStore()

// Created
async function created(): Promise<void> {
  const updateUserAuth = async (authUser: any): Promise<void> => {
    store.dispatch("setAuthUser", await queryUser(authUser));
  }

  const clearUserAuth = (): void => {
    store.dispatch('clearAuthUser');
  }

  store.dispatch('setLoading', true);

  firebaseApp.auth().onAuthStateChanged(async (authUser) => {
    try {
      if (!authUser) {
        clearUserAuth();
      } else {
        await updateUserAuth(authUser);
      }
    } catch (err) {
      console.error(err)
      store.dispatch('setError', { isError: true, text: err });
    } finally {
      store.dispatch('setLoading', false);
    }
  })
}
created()
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
