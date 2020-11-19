import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import axios from 'axios'
import 'materialize-css/dist/js/materialize.min'
import M from 'materialize-css'


Vue.prototype.$axios = axios
Vue.use(Vuelidate)
Vue.use(M)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
