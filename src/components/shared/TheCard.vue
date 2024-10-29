<template>
  <v-responsive class="mx-auto mb-5 the-card align-center" max-width="1160">
    <v-card class="pa-4" rounded="0">
      <div
        :class="[
          'pa-3 d-flex justify-space-between w-100',
          { collapsed: isRolled },
        ]"
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
            :class="`cursor-pointer action ${isRolled && 'action-rotate'}`"
            color="#c0c0c0"
            size="50"
            icon="mdi-chevron-down"
            :title="isRolled ? 'Expand' : 'Collapse'"
            @click="toggleRoll"
          />
          <v-icon
            class="cursor-pointer action"
            color="#c0c0c0"
            size="30"
            icon="mdi-trash-can"
            title="Delete"
            @click="handleDelete"
          />
        </v-row>
      </div>

      <!-- Content with slide transition -->
      <v-slide-y-transition>
        <slot v-if="!isRolled" />
      </v-slide-y-transition>
    </v-card>
  </v-responsive>
</template>

<script setup lang="ts">
interface TheCardProps {
  title: string | null;
  subtitle?: string;
  withActions?: boolean;
}

withDefaults(defineProps<TheCardProps>(), {
  subtitle: "",
  withActions: false,
});

const isRolled = ref<boolean>(false);

// Toggle function for collapsing/expanding card
const toggleRoll = () => {
  isRolled.value = !isRolled.value;
};

const handleDelete = () => {
  alert("Coming soon!");
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
