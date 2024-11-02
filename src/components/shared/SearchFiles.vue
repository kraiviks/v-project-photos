<template>
  <v-card class="border-t border-b elevation-1" color="transparent">
    <v-card-text>
      <v-text-field
        v-model="search"
        @input="handleSearch"
        prepend-inner-icon="mdi-magnify"
        density="compact"
        label="Search photos"
        variant="solo"
        hide-details
        single-line
        flat
        bg-color="transparent"
        class="text-grey-darken-1"
      ></v-text-field>

      <!-- Dropdown list -->
      <v-menu
        v-model="menu"
        activator="parent"
        open-on-click
        close-on-content-click
        offset-y
        max-height="200"
      >
        <v-list class="pa-0">
          <v-list-item
            v-for="(result, index) in filteredResults"
            :key="index"
            @click="clearResult"
          >
            <v-list-item-title>
              <RouterLink :to="`/photos/${result.id}`" class="link">
                <span
                  v-for="(part, index) in highlightText(result.title)"
                  :key="index"
                >
                  <span :class="{ highlight: part.highlight }">
                    {{ part.text }}
                  </span>
                </span>
              </RouterLink>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { usePhotosStore, type Photo } from "@/stores/usePhotosStore";
import { RouterLink } from "vue-router";

interface HighlightedText {
  text: string;
  highlight: boolean;
}

const photosStore = usePhotosStore();
const search = ref<string>("");
const menu = ref<boolean>(false);

// Get all photos from photosByAlbum
const allPhotos = computed<Photo[]>(() => {
  return Object.values(photosStore.photosByAlbum).flat();
});

// Filter photos based on search
const filteredResults = computed<Photo[]>(() => {
  if (!search.value) return [];
  return allPhotos.value.filter((photo) =>
    photo.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

function handleSearch() {
  menu.value = filteredResults.value.length > 0;
}

function clearResult() {
  search.value = "";
  menu.value = false;
}

function highlightText(title: string): HighlightedText[] {
  const query = search.value;
  if (!query) return [{ text: title, highlight: false }];

  const regex = new RegExp(`(${query})`, "gi");
  const parts = title.split(regex).map((part) => ({
    text: part,
    highlight: regex.test(part),
  }));
  return parts;
}
</script>

<style scoped>
.v-text-field {
  width: 100%;
}

/* Style for highlighted text */
.link {
  color: black;
  text-decoration: none;
}
.highlight {
  background-color: #ea5a5a;
  color: white;
  font-weight: bold;
}
</style>
