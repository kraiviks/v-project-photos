/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: "#EBEBEB",
    primary: "#ea5a5a",
    secondary: "#6c757d",
    "text-category": "#d6d5df",
    "text-list-item": "a3a2a8",
    "btn-primary": "#28a745",
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
