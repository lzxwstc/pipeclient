import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import reports from './modules/reports'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    reports
  },
  getters
})
export default store
