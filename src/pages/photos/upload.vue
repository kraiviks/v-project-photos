<template>
  <PhotoManager title="Add photo" />
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core';

useTitle("Upload");
</script>
