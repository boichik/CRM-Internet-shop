import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import orderFilter from '@/filters/order_text.filter'
import dateFilter from '@/filters/date.filter'
import axios from 'axios'
import Paginate from 'vuejs-paginate'
import 'materialize-css/dist/js/materialize.min'
import M from 'materialize-css'
import Loader from '@/components/app/Loader'

Vue.component('Paginate', Paginate)
Vue.prototype.$axios = axios
Vue.use(Vuelidate)
Vue.use(M)
Vue.config.productionTip = false
Vue.filter('order', orderFilter)
Vue.filter('date', dateFilter)

Vue.component('Loader', Loader)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
