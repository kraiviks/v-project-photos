<template>
  <v-dialog max-width="340">
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon
        v-bind="activatorProps"
        icon="mdi-trash-can"
        color="#c0c0c0"
        :size="size"
        class="icon-hover"
        :style="{ '--hover-color': hoverIconColor || 'grey' }"
        title="Delete"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        prepend-icon="mdi-alert-decagram-outline"
        text="Are you sure you want to delete this item?"
        title="Confirm deleting"
      >
        <template v-slot:actions>
          <v-btn text="Close" @click.stop="isActive.value = false"></v-btn>
          <v-btn
            color="btn-dangerous"
            text="Confirm"
            @click.stop="
              () => {
                remove();
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
defineProps<{
  size?: string | number;
  hoverIconColor?: string;
  remove: () => void;
}>();
</script>

<style scoped lang="scss">
.icon-hover {
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: var(--hover-color) !important;
  }
}
</style>
