// import Vue from "vue";
import { createStore } from "vuex";
import pattern from "./modules/pattern";
import brush from "./modules/brush";
// Vue.use(Vuex);

const store = createStore({
  state: {
    nodes: [],
    edges: [],
  },
  mutations: {
    commitNodes(state, nodes) {
      state.nodes = nodes;
    },
    commitEdges(state, edges) {
      state.edges = edges;
    },
  },
  modules: {
    pattern,
    brush,
  },
});

export default store;
