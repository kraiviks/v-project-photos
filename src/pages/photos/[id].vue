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
import { useRouteId } from "@/hooks/useRoute";
import { usePageTitle } from "@/hooks/usePageTitle";

const photosStore = usePhotosStore();
const routeId = useRouteId();

const photo = computed(() => photosStore.getPhotoById(routeId));

usePageTitle(`Photo: ${photo.value?.title}`);
</script>
