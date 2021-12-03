<template>
  <div class="Me">
    <div class="user-info">
      <div class="pfp">
        <img :src="$store.getters.authUser.photoURL" />
      </div>
      <div class="name">
        <h1>{{ $store.getters.authUser.displayName }}</h1>
        <!-- <h1>Phatsanphon Nakaranurak</h1> -->

        <h3>{{ $store.getters.authUser.email }}</h3>
        <!-- <h3>phatsanphon2004@outlook.com</h3> -->
      </div>
    </div>

    <div class="form">
      <label for="level-hsk">My HSK Level is</label>
      <select id="level-hsk">
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3</option>
        <option :value="4">4</option>
        <option :value="5">5</option>
        <option :value="6">6</option>
      </select>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Me"
})
</script>

<style>
.Me {
  height: calc(100vh - 3.5rem - 3rem);

  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 1280px;
  margin: auto;
}

.pfp img {
  border-radius: 50%;

  @apply shadow-lg;
  @apply w-24 ml-4;

  color: black;
}

.user-info {
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin: 40px;
}

.name {
  @apply ml-5;
}

.name h1 {
  @apply text-base lg:text-lg font-bold m-2;
}

.name h3 {
  @apply text-sm lg:text-base font-normal m-2;
}

.form label {
  @apply mr-3;
}

.form select {
  @apply p-1 mx-0.5 transition-all;
  @apply border-2 rounded shadow-md;
  @apply focus:outline-none focus:ring-blue-500 focus:border-blue-700;
}
</style>