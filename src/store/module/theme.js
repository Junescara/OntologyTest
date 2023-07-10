import { defineStore } from "pinia";

const themeStore = defineStore("theme", {
  state: () => ({
    dark: true,
  }),
  actions: {},
});

export default themeStore;