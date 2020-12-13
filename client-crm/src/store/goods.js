import axios from 'axios'
import {HTTP} from '@/services/api'

export default{
  actions:{
      async fetchGoods({dispatch, commit}){
        try {
         const goods = await HTTP.get('/goods' , {headers: { token: localStorage.getItem('token')}})
                                  .then(res=>{
                                    return res.data.goods
                                  })
            return Object.keys(goods).map(key => ({...goods[key]}))                
          } catch (e) {
            console.log(e)
          }
      },
      async fetchGoodById({dispatch, commit}, id){
        try {
          const good = await HTTP.get(`/goods/${id}`, {headers: { token: localStorage.getItem('token')}})
                                  .then(res=>{
                                    return res.data.good
                                  })
            return {...good}              
          } catch (e) {
            console.log(e)
          }
      },
      async updateGoodById({dispatch, commit},dataForm){
          try{
                await HTTP.post(`/goods/${dataForm.id}`, {dataForm, token:localStorage.getItem('token')})
                          .then(res=>{
                              return res.data.title
                          }) 
          }
          catch(e){
              console.log(e)
          }
      }
    
  }
}