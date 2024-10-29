<template>
  <v-container
    class="justify-center text-center h-100 d-flex flex-column align-center"
  >
    <v-icon size="100" color="grey lighten-1">mdi-alert-circle-outline</v-icon>
    <h1 class="mt-4 text-h4">Page not found</h1>
    <p class="text-subtitle-1">
      Unfortunately, we couldn't find the page you're looking for.
    </p>
    <v-btn color="primary" class="mt-6" @click="$router.push('/')"
      >Go back home</v-btn
    >
  </v-container>
</template>
