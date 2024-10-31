<template>
  <v-container>
    <TheCard
      withActions
      v-for="(photos, index) in photosStore.photosByAlbum"
      :title="photos[0].albumId"
      :subtitle="`(${photos.length} photos)`"
      :key="index"
    >
      <div
        class="grid"
        :style="{ gridTemplateColumns: `repeat(${gridStore.columns}, 1fr)` }"
      >
        <TheCardImage v-for="photo in photos" :key="photo.id" :item="photo" />
      </div>
    </TheCard>
  </v-container>
</template>

<script lang="ts" setup>
import { useGridStore } from "@/stores/useGridStore";
import { usePhotosStore } from "@/stores/usePhotosStore";
import { usePageTitle } from "@/hooks/usePageTitle";

usePageTitle("Photos");

const gridStore = useGridStore();
const photosStore = usePhotosStore();
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  row-gap: 70px;
  column-gap: 15px;
}
</style>
