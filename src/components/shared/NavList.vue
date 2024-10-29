<template>
  <nav>
    <v-list nav dense density="compact">
      <!-- Subheader with optional icon -->

      <v-list-subheader
        color="text-category"
        class="font-weight-bold text-uppercase text-subtitle-2"
        :class="{ 'custom-subheader': subheaderIcon }"
        >{{ title }}
        <div class="cursor-pointer v-overlay">
          <v-icon
            v-if="subheaderIcon"
            :icon="subheaderIcon"
            color="primary"
            @click="subHeaderIconHandler"
          />
        </div>
      </v-list-subheader>

      <!-- List items -->

      <v-list-item
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        rounded="0"
        min-height="30"
        @click="$router.push(item.href)"
        class="pl-5 text-grey-lighten-1 list-item-hover"
        :active="item.href === route.fullPath"
      >
      </v-list-item>
    </v-list>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  list: Array<{ title: string; href: string }>;
  subheaderIcon?: string;
  subHeaderIconHandler?: () => void;
}>();

const route = useRoute();
</script>

<style scoped lang="scss">
.custom-subheader {
  padding-right: 10px;
  :deep(.v-list-subheader__text) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
}

.list-item-hover {
  border-left: 2px solid transparent;
  transition: border-left 0.2s, background-color 0.2s;
  padding: 0;
  &:hover,
  &.v-list-item--active {
    border-left: 2px solid #ea5a5a;
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>
