<template>
  <div class="Footer disable-select">
    <h5>Made by Phatsanphon Nakaranurak</h5>
    <!-- <h6>Latest build: {{ buildTime }}</h6> -->
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment'
import { computed } from 'vue'

const buildTime = computed((): string => moment().format('MMMM Do YYYY, hh:mm:ss'))
</script>

<style scoped>
.Footer {
  text-align: center;
  height: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.Footer h5 {
  @apply text-sm;
}

.Footer h6 {
  @apply text-xs;
}
</style>