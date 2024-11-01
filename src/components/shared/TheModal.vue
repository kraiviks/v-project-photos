<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="localOpen"
      max-width="600"
      @update:modelValue="updateOpen"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <div class="cursor-pointer modal-icon-container">
          <v-icon :icon="triggerIcon" color="primary" v-bind="activatorProps" />
        </div>
      </template>
      <slot />
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  triggerIcon: string;
  open: boolean;
}>();

const emit = defineEmits<{
  (event: "update:open", value: boolean): void;
}>();

const localOpen = ref(props.open);
watch(
  () => props.open,
  (newVal) => {
    localOpen.value = newVal;
  }
);

const updateOpen = (value: boolean) => {
  emit("update:open", value);
};
</script>

<style scoped lang="scss">
.modal-icon-container {
  margin-right: -17px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
