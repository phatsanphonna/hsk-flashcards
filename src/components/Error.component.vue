<template>
  <div v-if="store.getters.error.isError" class="error">
    <font-awesome-icon icon="exclamation" size="5x" />
    <p>{{ store.getters.error.text }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";

const store = useStore()
</script>

<style scoped>
.error {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 99999;

  @apply bg-red-800;
  color: white;
}

.error p {
  margin: 8px;
  @apply text-lg;
}
</style>