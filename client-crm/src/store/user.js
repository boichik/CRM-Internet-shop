import axios from 'axios'
import { HTTP } from '@/services/api'
export default{
    actions:{
        async ChangeUserName({dispatch, commit}, data){
            try {
            await HTTP.post("/user/name", {data, token:localStorage.getItem('token')})
                      .then(res=>{
                          return res.data.title
                      })         
              } catch (e) {
                throw e
              }
          }
    }
}