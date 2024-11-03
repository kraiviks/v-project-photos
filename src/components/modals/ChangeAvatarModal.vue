<template>
  <v-dialog max-width="340">
    <template v-slot:activator="{ props: activatorProps }">
      <v-avatar
        v-bind="activatorProps"
        color="surface-variant"
        :image="avatar"
        size="80"
        class="cursor-pointer"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        prepend-icon="mdi-alert-decagram-outline"
        text="Please choose an avatar"
        title="Change avatar"
      >
        <v-text-field v-model="loadedAvatar" label="Avatar URL"></v-text-field>
        <v-avatar
          color="surface-variant"
          :image="avatar"
          size="80"
          class="ma-auto"
        />
        <template v-slot:actions>
          <v-btn
            text="Default"
            @click.stop="
              () => {
                selectDefaultAvatar();
                isActive.value = false;
              }
            "
          >Default</v-btn>
          <v-btn
            color="surface-variant"
            text="Updated"
            @click.stop="
              () => {
                updateAvatar();
                isActive.value = false;
              }
            "
          >Updated</v-btn>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import defaultAvatar from "@/assets/avatar.png";

const loadedAvatar = useStorage("avatar", "");
const avatar = ref(loadedAvatar.value || defaultAvatar);

// Function to check if an image is available
const checkImageAvailability = (url: string, callback: (isAvailable: boolean) => void) => {
  const img = new Image();
  img.src = url;

  img.onload = () => callback(true); // If the image is available
  img.onerror = () => callback(false); // If the image is not available
};

// Watches for changes in loadedAvatar and updates avatar with availability check
watch(loadedAvatar, (newVal) => {
  if (newVal) {
    checkImageAvailability(newVal, (isAvailable) => {
      avatar.value = isAvailable ? newVal : defaultAvatar;
    });
  } else {
    avatar.value = defaultAvatar;
  }
});

const selectDefaultAvatar = () => {
  avatar.value = defaultAvatar;
  loadedAvatar.value = "";
};

const updateAvatar = () => {
  if (loadedAvatar.value) {
    checkImageAvailability(loadedAvatar.value, (isAvailable) => {
      avatar.value = isAvailable ? loadedAvatar.value : defaultAvatar;
    });
  } else {
    avatar.value = defaultAvatar;
  }
};
</script>

