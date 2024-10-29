<template>
  <v-container class="d-flex align-center ga-2">
    <Grid5Icon class="mr-2" />

    <!-- Slider for controlling columns -->
    <v-slider
      v-model="columns"
      class="slider"
      color="primary"
      track-size="2"
      thumb-size="10"
      min="1"
      max="5"
      step="1"
      track-fill-color="grey lighten-3"
      track-color="grey lighten-5"
    />

    <Grid4Icon class="ml-2" />
  </v-container>
</template>

<script lang="ts" setup>
import { useGridStore } from "@/stores/useGridStore";

const gridStore = useGridStore();

// Computed property for two-way binding with slider
const columns = computed<number>({
  get: () => gridStore.columns,
  set: (val: number) => gridStore.setColumns(val),
});
</script>

<style scoped lang="scss">
.slider {
  margin-top: -3px;
}
</style>
