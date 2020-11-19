import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import axios from 'axios'

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
      async login({dispatch,commit}, user){
           try{
               await axios.create({baseURL:'http://localhost:5000'})
                .post('/login', user)
                .then(res =>{
                  localStorage.setItem('token', res.data.token);
                  }, err =>{
                      console.log(err)
                  })
           }
           catch(e){
               console.log(e)
           }   
       },
      logout({dispatch,commit}){
          try{
            localStorage.removeItem('token')
            commit('clearInfo')
          }
          catch(e){
            console.log(e)
          }
       },
       async fetchInfo ({ dispatch, commit }) {
        try {
          await axios
             .create({baseURL:'http://localhost:5000'})
             .get('/user' , {headers: { token: localStorage.getItem('token')}})
             .then(res=> {
               const info = res.data.user.userInfo
               commit('setInfo', info)
              })
        } catch (e) {
          console.log(e)
        }
      }  
  },
  modules: {
    auth
  }
})
