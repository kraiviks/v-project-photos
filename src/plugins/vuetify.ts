/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "@/styles/colors.scss";
// Composables
import { createVuetify } from "vuetify";
import { getCssVariable } from '@/utils/helpers';

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: getCssVariable("--v-background-base"),
    primary: getCssVariable("--v-primary-base"),
    secondary: getCssVariable("--v-secondary-base"),
    "text-category": getCssVariable("--v-text-category-base"),
    "text-list-item": getCssVariable("--v-text-list-item-base"),
    "btn-primary": getCssVariable("--v-btn-primary-base"),
    "btn-dangerous": getCssVariable("--v-btn-dangerous-base"),
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
});
