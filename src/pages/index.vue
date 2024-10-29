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
        <TheCardImage
          v-for="photo in photos"
          :key="photo.title"
          :item="photo"
        />
      </div>
    </TheCard>
  </v-container>
</template>

<script lang="ts" setup>
import { useGridStore } from "@/stores/useGridStore";
import { usePhotosStore } from "@/stores/usePhotosStore";

const gridStore = useGridStore();
const photosStore = usePhotosStore();
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  gap: 8px;
}
</style>
