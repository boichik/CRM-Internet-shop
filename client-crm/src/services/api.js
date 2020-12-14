import axios from 'axios'
export const HTTP =  axios.create({
    //baseURL: 'https://limitless-island-77548.herokuapp.com/'
    baseURL: 'http://localhost:5000'
  })
