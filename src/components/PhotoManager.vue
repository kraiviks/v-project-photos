<template>
  <v-container>
    <TheCard :title="title">
      <v-row class="flex-md-row flex-column">
        <v-col cols="12" lg="6" class="mt-4 mt-md-0">
          <v-form
            class="mt-3"
            v-model="valid"
            ref="form"
            @submit.prevent="edit ? save() : createRecord()"
          >
            <label for="id">Id:</label>
            <v-text-field
              id="id"
              variant="outlined"
              density="compact"
              v-model="photoData.id"
              bg-color="blue-grey-lighten-3"
              disabled
            />

            <label for="album">Album:</label>
            <v-text-field
              id="album"
              variant="outlined"
              density="compact"
              v-model="photoData.albumId"
              :rules="[(v) => !!v || 'Album is required']"
            />

            <label for="description">Description:</label>
            <v-textarea
              id="description"
              variant="outlined"
              rows="2"
              density="compact"
              v-model="photoData.title"
              :rules="[(v) => !!v || 'Description is required']"
            />

            <label for="url">Url:</label>
            <v-text-field
              id="url"
              variant="outlined"
              density="compact"
              v-model="photoData.url"
              :rules="[(v) => !!v || 'Url is required']"
            />

            <v-card-actions class="justify-end mt-3 ga-2">
              <v-btn
                color="secondary"
                variant="flat"
                class="text-none"
                @click="router.back()"
                >Cancel</v-btn
              >
              <v-btn
                :disabled="!valid"
                color="btn-primary"
                variant="flat"
                class="text-none"
                type="submit"
                >Save</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-col>
        <v-col cols="12" lg="6" class="justify-center d-flex">
          <v-img
            v-if="photoData.url"
            :src="photoData.url"
            class="mt-4 border"
            max-height="420"
            cover
          />
          <div
            v-else
            class="justify-center d-flex flex-column align-center w-100 h-100"
          >
            Enter url of image 600x600
          </div>
        </v-col>
      </v-row>
    </TheCard>
  </v-container>
</template>

<script lang="ts" setup>
import { usePhotosStore, type Photo } from "@/stores/usePhotosStore";
import { useRouteId } from "@/hooks/useRoute";

const props = defineProps<{
  title: string;
  edit?: boolean;
}>();

const routeId = useRouteId();
const router = useRouter();
const photosStore = usePhotosStore();
const valid = ref<boolean>(false);
const form = ref<HTMLFormElement | null>(null);

const photoData = reactive<Photo>({
  id: undefined,
  albumId: null,
  title: "",
  url: "",
});

const save = () => {
  if (form.value?.checkValidity()) {
    photosStore.updatePhoto(routeId, photoData);
    router.back();
  }
};

const createRecord = () => {
  if (form.value?.checkValidity()) {
    photosStore.createPhoto({
      title: photoData.title,
      url: photoData.url,
      albumId: photoData.albumId,
    });
    router.back();
  }
};

onMounted(() => {
  if (props.edit) {
    const photo = photosStore.getPhotoById(routeId);
    if (photo) {
      photoData.id = photo.id;
      photoData.albumId = photo.albumId;
      photoData.title = photo.title;
      photoData.url = photo.url;
    }
  }
});
</script>
