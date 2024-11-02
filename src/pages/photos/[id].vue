<template>
  <v-container class="overflow-hidden" fluid>
    <v-card v-if="photo" class="pa-2" elevation="4">
      <h1 class="text-center text-h6">{{ photo.title }}</h1>
      <TheCardImage :item="photo" isMaxHeight />
      <v-card-text class="text-center" style="padding: 8px">
        <p>Album ID: {{ photo.albumId }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { usePhotosStore } from "@/stores/usePhotosStore";
import { useTitle } from "@vueuse/core";
import { RouteLocationNormalizedLoaded } from "vue-router";

type RouteWithId = RouteLocationNormalizedLoaded & {
  params: { id: string };
};

const photosStore = usePhotosStore();
const route = useRoute();

const id = computed(() => {
  const id = (route.params as RouteWithId["params"]).id;
  return id;
});

const photo = computed(() => photosStore.getPhotoById(id.value));

useTitle(`Photo: ${photo.value?.title}`);
</script>
