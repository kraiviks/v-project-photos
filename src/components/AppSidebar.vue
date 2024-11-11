<template>
  <v-navigation-drawer
    v-model="showedDrawer"
    app
    width="223"
    :mobile="isMobile"
    color="var(--v-sidebar-main-bg)"
    fixed
  >
    <!-- Close Drawer Button for Mobile -->
    <v-row
      v-if="isMobile"
      class="cursor-pointer drawer-close"
      @click="showedDrawer = false"
    >
      <v-icon size="30" color="primary">mdi-close-circle-outline</v-icon>
    </v-row>

    <!-- Drawer Main Content -->
    <v-col class="pa-0 d-flex flex-column justify-space-between h-100">
      <v-col class="py-8 drawer-header" align="center">
        <ChangeAvatarModal />

        <EditableUserName />

        <v-list-item-subtitle class="text-center text-grey-lighten-3">
          {{ photosStore.photosAmount }} files
        </v-list-item-subtitle>
        <div class="btn-animate">
          <RouterLink to="/photos/upload">
            <v-btn
              variant="flat"
              color="primary"
              min-width="150"
              rounded="xl"
              class="mt-6"
            >
              Upload
            </v-btn>
          </RouterLink>
        </div>
      </v-col>

      <v-col class="pa-0 flex-0-0">
        <SearchFiles />
      </v-col>

      <v-col class="mt-3 pa-0">
        <NavList title="Categories" :list="CATEGORIES" />
        <NavList
          title="Albums"
          :list="photosStore.albums"
          subheaderIcon="mdi-plus-circle-outline"
        />
      </v-col>

      <v-col class="pa-0 drawer-footer">
        <GridSize />
      </v-col>
    </v-col>
  </v-navigation-drawer>

  <!-- Mobile Open Button -->
  <v-avatar
    v-if="isMobile"
    class="drawer-open-btn"
    color="surface-variant"
    :image="avatar"
    size="80"
    @click="showedDrawer = true"
  />
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { useWindowSize } from "@/hooks/useWindowSize";
import { usePhotosStore } from "@/stores/usePhotosStore";
import defaultAvatar from "@/assets/avatar.png";
import { checkImageAvailability } from "@/utils/helpers";

// Constants
const CATEGORIES = [
  { title: "Photos", href: "/" },
  { title: "Videos", href: "/videos" },
  { title: "Projects", href: "/projects" },
];

// Initialize state
const photosStore = usePhotosStore();
const showedDrawer = ref<boolean>(true);
const { windowWidth } = useWindowSize();
const loadedAvatar = useStorage("avatar", "");
const avatar = ref(loadedAvatar.value || defaultAvatar);

// Computed property to determine if the view is mobile
const isMobile = computed(() => windowWidth.value < 768);
// Lifecycle hooks
onMounted(() => {
  if (isMobile.value) {
    showedDrawer.value = false;
  }
});

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
</script>

<style scoped lang="scss">
.username {
  max-width: 100px;
}

.drawer-open-btn {
  position: fixed;
  left: -35px;
  top: -40px;
  border-radius: 50%;
  transform: scale(0.7);
  z-index: 9;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(0.9);
  }
}

.drawer-close {
  position: absolute;
  right: 15px;
  top: 15px;
}

.drawer-header {
  max-height: 270px;
  background-color: var(--v-sidebar-header-bg);
}

.drawer-footer {
  display: flex;
  align-items: center;
  background-color: var(--v-sidebar-footer-bg);
  border-top: 1px solid var(--v-sidebar-footer-border);
  max-height: 70px;
  :deep(.v-input__details) {
    display: none;
  }
}

.btn-animate {
  position: relative;
  width: max-content;
  transition: all 0.3s ease-in-out;
  &::after {
    content: "";
    position: absolute;
    display: block;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--v-btn-animate);
    box-shadow: 1px 1px 10px 3px var(--v-btn-animate);
    transition: all 0.3s ease-in-out;
    z-index: -1;
  }
  &:hover {
    transform: translateY(-5%);
    :deep(.v-btn) {
      background-color: var(--v-btn-animate-hover) !important;
    }
    &::after {
      width: 80%;
      height: 30%;
      transform: translate(-50%, 10%);
    }
  }
}
</style>
