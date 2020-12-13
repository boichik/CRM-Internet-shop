import axios from 'axios'
import { HTTP } from '@/services/api'
export default{
  actions:{
      async fetchReports({dispatch, commit}){
        try {
         const reports = await HTTP.get('/reports' , {headers: { token: localStorage.getItem('token')}})
                        .then(res=>{
                           return res.data.reports
                        })
            return Object.keys(reports).map(key => ({...reports[key]}))                
          } catch (e) {
            console.log(e)
          }
      },
      async setReports({dispatch, commit}, formData){
        try {
        //  const token = localStorage.getItem('token')
            await HTTP.post(`/reports`, {formData, token:localStorage.getItem('token')})
                      .then(res=>{
                          return res.data.title
                      })         
          } catch (e) {
            throw e
          }
      },
      async updateReports({dispatch, commit}, formData){
        try {
        //  const token = localStorage.getItem('token')
            await HTTP.post(`/reports/update`, {formData, token:localStorage.getItem('token')})
                      .then(res=>{
                          return res.data.title
                      })         
          } catch (e) {
            throw e
          }
      },

  }
}