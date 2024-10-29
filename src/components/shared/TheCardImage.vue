<template>
  <v-card class="px-1 py-4 card" flat>
    <!-- Image container with hover effect -->
    <div
      class="rounded d-flex position-relative image-container"
      :style="{ minHeight: minHeightStyle }"
    >
      <!-- Conditional rendering for max-height or RouterLink -->
      <v-img
        :src="item.url"
        :style="{
          maxHeight: maxHeightStyle,
          cursor: isMaxHeight ? 'default' : 'pointer',
        }"
        rounded
        cover
        @click="!isMaxHeight && router.push(`/photos/${item.id}`)"
      />

      <!-- Footer overlay with icons for edit and delete -->
      <div class="footer-overlay">
        <RouterLink :to="`/photos/edit/${item.id}`">
          <v-icon
            class="cursor-pointer action"
            color="#c0c0c0"
            size="20"
            icon="mdi-application-edit-outline"
            title="Edit"
          />
        </RouterLink>
        <v-icon
          class="cursor-pointer action"
          color="#c0c0c0"
          size="20"
          icon="mdi-trash-can"
          title="Delete"
          @click="handleDelete"
        />
      </div>
    </div>

    <!-- Display item ID -->
    <div class="mt-4 text-grey-lighten-1 card-id">id - {{ item.id }}</div>
  </v-card>
</template>

<script setup lang="ts">
import { usePhotosStore, type Photo } from "@/stores/usePhotosStore";
import { useGridStore } from "@/stores/useGridStore";

const { item, isMaxHeight } = defineProps<{
  item: Photo;
  isMaxHeight?: boolean;
}>();

const router = useRouter();
const photosStore = usePhotosStore();
const gridStore = useGridStore();

const maxHeightStyle = computed(() => {
  if (isMaxHeight) {
    return "calc(100vh - 200px)";
  }

  switch (gridStore.columns) {
    case 2:
      return "300px";
    case 3:
      return "300px";
    case 4:
      return "200px";
    case 5:
      return "160px";
    default:
      return "600px";
  }
});

const minHeightStyle = computed(() => {
  switch (gridStore.columns) {
    case 2:
      return "120px";
    case 3:
      return "90px";
    case 4:
      return "70px";
    case 5:
      return "60px";
    default:
      return "285px";
  }
});

const handleDelete = () => {
  if (item.id != null) {
    photosStore.deletePhoto(item.id);
    if (isMaxHeight) {
      router.back();
    }
  } else {
    console.warn("ID is not available for deletion");
  }
};
</script>

<style scoped lang="scss">
.card {
  &:hover {
    .card-id {
      transition: color 0.3s;
      color: #ea5a5a !important;
    }
    .image-container {
      .footer-overlay {
        opacity: 1;
      }
      box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.4);
    }
  }
  .action {
    transition: color 0.3s;
    &:hover {
      color: #ea5a5a !important;
    }
  }
}

.image-container {
  transition: all 0.3s ease;
}

.footer-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  color: white;
  text-align: center;
  transition: opacity 0.3s ease;
  z-index: 100;
  opacity: 0;
}
</style>
