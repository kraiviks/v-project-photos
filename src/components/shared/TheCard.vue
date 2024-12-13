<template>
  <v-responsive class="mx-auto mb-5 the-card align-center" max-width="1160">
    <v-card class="pa-4 pb-13" rounded="0">
      <div
        :class="[
          'pa-3 d-flex justify-space-between w-100',
          { collapsed: !isOpen, 'cursor-pointer': !isOpen },
        ]"
        @click="toggleCollapse"
      >
        <v-card-title class="ma-0 pa-0 text-grey-darken-2">
          <span
            class="mr-1"
            :class="{ 'text-h6': $vuetify.display.smAndDown }"
            >{{ title }}</span
          >
          <span
            class="text-grey-lighten-1 font-weight-medium"
            :class="{ 'text-caption': $vuetify.display.smAndDown }"
            >{{ subtitle }}</span
          >
        </v-card-title>

        <div class="card-parallelogram" />

        <!-- Actions section -->
        <v-row class="actions flex-0-0" align="center" v-if="withActions">
          <v-icon
            :class="`cursor-pointer action ${!isOpen && 'action-rotate'}`"
            color="#c0c0c0"
            size="50"
            icon="mdi-chevron-down"
            :title="!isOpen ? 'Expand' : 'Collapse'"
            @click.stop="toggleCollapse"
          />
          <ConfirmRemoveModal :remove="removeItem" />
        </v-row>
      </div>

      <!-- Content with slide transition -->
      <v-expand-transition>
        <slot v-if="isOpen" />
      </v-expand-transition>
    </v-card>
  </v-responsive>
</template>

<script setup lang="ts">
import { usePhotosStore } from "@/stores/usePhotosStore";

interface TheCardProps {
  title: string;
  subtitle?: string;
  withActions?: boolean;
}

const props = withDefaults(defineProps<TheCardProps>(), {
  subtitle: "",
  withActions: false,
});

const router = useRouter();
const photoStore = usePhotosStore();
const isOpen = ref<boolean>(true);

// Toggle function for collapsing/expanding card
const toggleCollapse = () => {
  isOpen.value = !isOpen.value;
};

const removeItem = () => {
  photoStore.deleteAlbum(props.title);
  router.push("/");
};
</script>

<style scoped lang="scss">
.the-card {
  box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.3);
}

// Parallelogram styling
.card-parallelogram {
  transform: translate(-5%, -72%) skewY(30deg) rotate(-30deg);
  width: 100%;
  height: 35px;
  background-color: #ebebeb;
}

// Action button styles
.actions {
  margin-top: -10px;
  .action {
    transition: color 0.3s, transform 0.3s;
    &-rotate {
      transform: rotate(180deg);
    }
    &:hover {
      color: grey !important;
    }
  }
}

// Collapsed state for the card
.collapsed {
  max-height: 100px;
  transition: max-height 0.3s ease;
}
</style>
