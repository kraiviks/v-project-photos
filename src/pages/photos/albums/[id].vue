<template>
  <v-container class="overflow-hidden">
    <TheCard :title="id" :subtitle="subtitle" withActions>
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
import { RouteLocationNormalizedLoaded } from "vue-router";
import { usePhotosStore } from "@/stores/usePhotosStore";
import { useGridStore } from "@/stores/useGridStore";
import { useTitle } from '@vueuse/core';

type RouteWithId = RouteLocationNormalizedLoaded & {
  params: { id: string };
};

const route = useRoute();
const photosStore = usePhotosStore();
const gridStore = useGridStore();

const id = computed(() => {
  const id = (route.params as RouteWithId["params"]).id;
  return id;
});

useTitle("Album: " + id.value);

const photos = computed(() => photosStore.getPhotosByAlbumId(id.value));
const subtitle = computed(() =>
  photos.value.length ? `(${photos.value.length} photos)` : ""
);
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  row-gap: 70px;
  column-gap: 15px;
}
</style>
