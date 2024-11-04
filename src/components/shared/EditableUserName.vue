<template>
  <div>
    <v-list-item-title
      v-if="!isEditing"
      class="mt-3 mb-2 text-center text-white font-weight-bold text-h7 cursor-pointer username"
      :title="name"
      @click="enableEdit"
    >
      {{ name || "Enter your name" }}
    </v-list-item-title>

    <input
      v-if="isEditing"
      ref="inputRef"
      v-model="name"
      class="mt-3 mb-2 text-center text-white font-weight-bold text-h7 username"
      placeholder="Enter your name"
      @blur="disableEdit"
      @keydown.enter="disableEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";

// Initialize state
const name = useStorage("userName", "Amelia Rice");
const isEditing = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

// Functions
const enableEdit = async () => {
  isEditing.value = true;
  await nextTick();
  inputRef.value?.focus();
};

const disableEdit = () => {
  isEditing.value = false;
};
</script>

<style scoped>
.username {
  max-width: 130px;
}
</style>
