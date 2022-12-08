import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import pattern from './modules/pattern'
import brush from './modules/brush'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    nodes: [],
    edges: []
  },
  mutations: {
    commitNodes(state,nodes) {
      state.nodes = nodes
    },
    commitEdges(state,edges) {
      state.edges = edges
    },
  },
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    pattern,
    brush
  },
  getters
})

export default store
