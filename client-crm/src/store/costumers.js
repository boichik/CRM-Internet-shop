import axios from 'axios'
import { HTTP } from '@/services/api'
export default{
    actions:{
        async fetchCostumerById({dispatch, commit}, id){
            try {
             const costumer = await HTTP.get(`/costumers/${id}`, {headers: { token: localStorage.getItem('token')}})
                                        .then(res=>{
                                          return res.data.costumer
                                        })
            return {...costumer}              
              } catch (e) {
                console.log(e)
              }
          },
          async fetchCostumers({dispatch, commit}){
            try {
                  const costumers = await HTTP.get('/costumers' , {headers: { token: localStorage.getItem('token')}})
                                              .then(res=>{
                                                return res.data.costumers
                                              })
                return Object.keys(costumers).map(key => ({...costumers[key]}))             
              } catch (e) {
                console.log(e)
              }
          }
      }
}
