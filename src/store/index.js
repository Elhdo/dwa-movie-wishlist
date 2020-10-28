import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import { movies } from './modules/movies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: '1.0.0',
  },
  modules: {
    movies,
  },
})
