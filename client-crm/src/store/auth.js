import axios from 'axios'
import {HTTP} from '@/services/api'

export default{
  actions:{
    async login({dispatch,commit}, user){
        try{
            await HTTP.post('/login', user)
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
       await HTTP.get('/user' , {headers: { token: localStorage.getItem('token')}})
                  .then(res=> {
                    const info = res.data.user.userInfo
                    commit('setInfo', info)
                  })
     } catch (e) {
       console.log(e)
     }
   },
   async register({dispatch, commit}, newUser){
     try{
          await HTTP.post('/register', newUser)

        }
        catch(e){
          console.log(e)
        }
   }

  }
}