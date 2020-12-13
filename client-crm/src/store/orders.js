import axios from 'axios'
import { HTTP } from '@/services/api'
export default{
  actions:{
      async fetchOrders({dispatch, commit}){
        try {
         const orders = await HTTP.get('/orders' , {headers: { token: localStorage.getItem('token')}})
                                  .then(res=>{
                                      return res.data.orders
                                  })
            return Object.keys(orders).map(key => ({...orders[key]}))                
          } catch (e) {
            console.log(e)
          }
      },
      async fetchOrdersById({dispatch, commit}, id){
        try {
         const order = await HTTP.get(`/orders/${id}`, {headers: { token: localStorage.getItem('token')}})
                                .then(res=>{
                                  return res.data.order
                                })
            return {...order}              
          } catch (e) {
            console.log(e)
          }
      },
      async fetchOrdersByStatus({dispatch, commit}, id){
        try {
         const order = await HTTP.get(`/orders/`, {headers: { token: localStorage.getItem('token')}})
                                .then(res=>{
                                  return res.data.order
                                })
            return {...order}              
          } catch (e) {
            console.log(e)
          }
      },
      async setOrderStatus({dispatch, commit}, formStatus){
        try {
        //  const token = localStorage.getItem('token')
        await HTTP.post(`/orders/${formStatus.id}`, {formStatus, token:localStorage.getItem('token')})
                  .then(res=>{
                      return res.data.title
                  })         
          } catch (e) {
            throw e
          }
      }
  }
}