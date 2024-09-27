import { defineStore } from "pinia";

const usethemeStore = defineStore("theme", {
  state: () => ({
    dark: true,
    darkColor: {
      text: "#D7D7D7",
      activeText: "#ffd04b",
      backgroundColor: "#545c64",
    },
    brightColor: {
      text: "#545c64",
      activeText: "#409eff",
      backgroundColor: "#fff",
    },
  }),
  getters: {},
  actions: {},
});

export { usethemeStore };
