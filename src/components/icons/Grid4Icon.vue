<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="box">
    <g
      class="stroke-color"
      fill="none"
      fill-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <path d="M1 1h7v7H1zM12 1h7v7h-7zM12 12h7v7h-7zM1 12h7v7H1z"></path>
    </g>
  </svg>
</template>

<style scoped>
.box {
  border: 1px solid var(--v-primary-base);
  padding: 1px;
  height: max-content;
  width: max-content;
}

.stroke-color {
  stroke: var(--v-primary-base);
}
</style>
