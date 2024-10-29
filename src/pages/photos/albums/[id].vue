<template>
  <v-container class="overflow-hidden">
    <TheCard :title="albumId" :subtitle="subtitle" withActions>
      <div
        class="grid"
        :style="{ gridTemplateColumns: `repeat(${gridStore.columns}, 1fr)` }"
      >
        <TheCardImage v-for="item in photos" :key="item!.title" :item="item" />
      </div>
    </TheCard>
  </v-container>
</template>

<script lang="ts" setup>
import { useRouteId } from "@/hooks/useRoute";
import { usePhotosStore } from "@/stores/usePhotosStore";
import { useGridStore } from "@/stores/useGridStore";

const albumId = useRouteId();
const photosStore = usePhotosStore();
const gridStore = useGridStore();

const photos = computed(() =>
  photosStore.photos.filter((item) => item.albumId === albumId)
);

const subtitle = computed(() =>
  photos.value.length ? `(${photos.value.length} photos)` : ""
);
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  gap: 8px;
}
</style>
