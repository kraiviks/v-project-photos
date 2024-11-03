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
        <v-text-field v-model="loadedAvatar"> </v-text-field>
        <v-avatar
          color="surface-variant"
          :image="avatar"
          size="80"
          class="ma-auto"
        />
        <template v-slot:actions>
          <v-btn text="Default" @click.stop="selectDefaulrAvatar"></v-btn>
          <v-btn
            color="surface-variant"
            text="Updated"
            @click.stop="updatedAvatar"
          ></v-btn>
          <v-btn
            color="btn-primary"
            text="Save"
            @click.stop="
              () => {
                isActive.value = false;
              }
            "
          ></v-btn>
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

const selectDefaulrAvatar = () => {
  avatar.value = defaultAvatar;
};

const updatedAvatar = () => {
  avatar.value = loadedAvatar.value;
};
</script>
