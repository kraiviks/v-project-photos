<template>
  <TheModal
    :open="isOpen"
    @update:open="isOpen = $event"
    :triggerIcon="triggerIcon"
  >
    <template #default>
      <v-card prepend-icon="mdi-plus-circle-outline" title="Add new album">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                label="Album name*"
                required
                v-model="albumName"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="isOpen = false"></v-btn>

          <v-btn
            color="btn-primary"
            text="Create"
            variant="tonal"
            @click="createAlbum"
            :disabled="!albumName"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </TheModal>
</template>

<script setup lang="ts">
import { usePhotosStore } from "@/stores/usePhotosStore";

defineProps<{
  triggerIcon: string;
}>();
const isOpen = ref<boolean>(false);
const albumName = ref<string>("");

const photoStore = usePhotosStore();

const createAlbum = () => {
  if (albumName.value) {
    photoStore.createAlbum(albumName.value);
    albumName.value = "";
    isOpen.value = false;
  }
};
</script>
