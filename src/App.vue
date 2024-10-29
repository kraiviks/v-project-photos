<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { usePhotosStore } from "@/stores/usePhotosStore";
const photosStore = usePhotosStore();

onMounted(async () => {
  await photosStore.fetchPhotos();
});
</script>
