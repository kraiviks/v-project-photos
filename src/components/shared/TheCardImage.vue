<template>
  <div class="card-image-container">
    <v-img
      :src="item.url"
      class="bg-grey-lighten-2 w-100 h-100 card-image"
      :style="{
        maxHeight: isMaxHeight ? 'calc(100vh - 150px)' : '',
        cursor: isMaxHeight ? 'default' : 'pointer',
      }"
      :alt="item.title"
      rounded
      cover
      aspect-ratio="16/9"
      @click="!isMaxHeight && router.push(`/photos/${item.id}`)"
      @load="() => (isLoaded = true)"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
      <template v-slot:error>
        <div class="d-flex align-center justify-center fill-height text-center">
          Error loading image
        </div>
      </template>

      <!-- Footer overlay with icons for edit and delete -->
      <div class="footer-overlay">
        <v-icon
          class="cursor-pointer action"
          color="#c0c0c0"
          size="20"
          icon="mdi-application-edit-outline"
          title="Edit"
          @click.stop="router.push(`/photos/edit/${item.id}`)"
        />
        <ConfirmRemoveModal
          size="20"
          :remove="handleDelete"
          hoverIconColor="var(--v-primary-base)"
        />
      </div>
    </v-img>
    <!-- Display item ID -->
    <div class="mt-4 text-grey-lighten-1 card-id h-100" v-if="isLoaded">
      id - {{ item.id }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePhotosStore, type Photo } from "@/stores/usePhotosStore";

const { item, isMaxHeight } = defineProps<{
  item: Photo;
  isMaxHeight?: boolean;
}>();

const router = useRouter();
const photosStore = usePhotosStore();

const isLoaded = ref<boolean>(false);

const handleDelete = async () => {
  if (item.id != null) {
    await photosStore.deletePhoto(item.id);
    if (isMaxHeight || !photosStore.photosByAlbum[item.albumId!]) {
      router.push("/");
    }
  } else {
    console.warn("ID is not available for deletion");
  }
};
</script>

<style scoped lang="scss">
.card-image-container {
  width: 100%;
  height: 100%;
  .card-image {
    transition: box-shadow 0.3s ease;
    width: 100%;
    height: 100%;
  }

  .card-id,
  .action {
    transition: color 0.3s;
  }

  &:hover {
    :deep(.v-img) {
      .footer-overlay {
        opacity: 1;
      }
    }
    .card-id {
      color: var(--v-primary-base) !important;
    }
    .card-image {
      box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.4);
    }
  }
  .action {
    &:hover {
      color: var(--v-primary-base) !important;
    }
  }
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
