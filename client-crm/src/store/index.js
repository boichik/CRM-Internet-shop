import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import orders from './orders'
import costumers from './costumers'
import user from './user'
import goods from './goods'
import reports from './reports'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    info:{}
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    },
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    info: s => s.info
  },
  actions:{
 
  },
  modules: {
    auth, orders, costumers, user, goods, reports
  }
})
