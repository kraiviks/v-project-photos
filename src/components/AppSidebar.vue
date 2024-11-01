<template>
  <v-navigation-drawer
    v-model="showedDrawer"
    app
    width="223"
    :mobile="isMobile"
    color="#1e1d26"
    fixed
  >
    <!-- Close Drawer Button for Mobile -->
    <v-row
      v-if="isMobile"
      class="cursor-pointer drawer-close"
      @click="showedDrawer = false"
    >
      <v-icon size="30">mdi-close-circle-outline</v-icon>
    </v-row>

    <!-- Drawer Main Content -->
    <v-col class="pa-0 d-flex flex-column justify-space-between h-100">
      <v-col class="py-8 drawer-header" align="center">
        <v-avatar
          color="surface-variant"
          image="@/assets/avatar.png"
          size="80"
        />
        <v-list-item-title
          class="mt-3 mb-2 text-center text-white font-weight-bold text-h7"
        >
          Amelia Rice
        </v-list-item-title>
        <v-list-item-subtitle class="text-center text-grey-lighten-3">
          2390 files
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
          :subHeaderIconHandler="subHeaderIconHandler"
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
    image="@/assets/avatar.png"
    size="80"
    @click="showedDrawer = true"
  />
</template>

<script setup lang="ts">
import { useWindowSize } from "@/hooks/useWindowSize";
import { usePhotosStore } from "@/stores/usePhotosStore";

// Initialize store and state
const photosStore = usePhotosStore();
const showedDrawer = ref<boolean>(true);
const { windowWidth } = useWindowSize();

// Determine if the view is mobile
const isMobile = computed(() => windowWidth.value < 768);

// Close drawer on mobile after mounting
onMounted(() => {
  if (isMobile.value) {
    showedDrawer.value = false;
  }
});

// Function to handle subheader icon click
const subHeaderIconHandler = () => {
  alert("Coming soon!");
};

// Define categories and albums
const CATEGORIES = [
  { title: "Photos", href: "/" },
  { title: "Videos", href: "/videos" },
  { title: "Projects", href: "/projects" },
];
</script>

<style scoped lang="scss">
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
  background-color: #272631;
}

.drawer-footer {
  display: flex;
  align-items: center;
  background-color: #19181e;
  border-top: 1px solid #111111;
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
    background: red;
    box-shadow: 1px 1px 10px 3px red;
    transition: all 0.3s ease-in-out;
    z-index: -1;
  }
  &:hover {
    transform: translateY(-5%);
    :deep(.v-btn) {
      background-color: #ea2e2e !important;
    }
    &::after {
      width: 80%;
      height: 30%;
      transform: translate(-50%, 10%);
    }
  }
}
</style>
