<template>
    <div class="app-page-container">
        
        <div class="page-title">
            <h2>Главная</h2>
            <hr>
        </div>
        <Loader v-if="loading"/>
        <section v-else-if="notItem" class="app-table">
            <h4>На данный момент статистика не доступна</h4>
            <p>Для работы з сервесом ознакомтесь по <router-link to="/api">ссылке</router-link></p>
        </section>
        <section v-else class="app-table m-row">
            <HomeChart v-if="reports.length!=0" :reports="reports"/>
            <HomeTable :tableItem="tableItem"/>
        </section>
    </div>
</template>
<script>
import HomeTable from '@/components/HomeTable'
import HomeChart from '@/components/HomeChart'

export default {
    name: 'Home',
    metaInfo:{
        title: 'Главная | BOYKO-CRM'
    },
    data:()=>({
      reports:[],
      orders:[],
      goods:[],
      newReport:[],
      userInfo:[],
      tableItem:[],
      loading:true,
      notItem: false
    }),
    components:{
       HomeTable, HomeChart
    },
    created(){
        this.renderHome()
    },
    mounted(){
        
    },
    methods:{
       async renderHome(){
           this.orders = await this.$store.dispatch('fetchOrders')
           this.goods = await this.$store.dispatch('fetchGoods')
           this.userInfo = this.$store.getters.info.lastReport
           if(this.orders.length==0 | this.goods.length==0){
               this.notItem=true
           }
           else{
                if(this.userInfo.slice(0,7) != new Date().toISOString().slice(0,7)){
                    this.createNewReport()
                }else{
                    this.updateReport()
                }
                
                this.reports = await this.$store.dispatch('fetchReports')

                this.renderHomeTable()
           }
           this.loading = false

       },
       async renderHomeTable(){
           this.tableItem = this.orders.filter(order=> order.order_date.slice(0,7) === new Date().toISOString().slice(0,7))
       },
       async createNewReport(){
           //Добавить обработку
           var data = new Date().toISOString()
           var profit = 0
           var possible = 0

           for(var i=0; i<this.orders.length; i++){
               if(this.orders[i].order_date.slice(0,7) === data.slice(0,7)){
                   for(var j=0; j<this.goods.length; j++){
                       if(this.orders[i].article_good === this.goods[j].article){
                           if(this.orders[i].status[this.orders[i].status.length-1].status_now === 'received'){
                              profit += (this.orders[i].count * this.orders[i].costs) - (this.orders[i].count * this.goods[j].price)
                              this.newReport.push(this.orders[i])
                           }else{
                               possible +=(this.orders[i].count * this.orders[i].costs) - (this.orders[i].count * this.goods[j].price)
                           }
            
                       }
                   }
               }
           }
           
           const formDate = {
               report_date: data,
               income : profit,
               possible: possible,
               allOrders: this.newReport
           }

           await this.$store.dispatch('setReports', formDate)
       },
       async updateReport(){
            var data = new Date().toISOString()
            var profit = 0
            var possible = 0

            for(var i=0; i<this.orders.length; i++){
                if(this.orders[i].order_date.slice(0,7) === data.slice(0,7)){
                    for(var j=0; j<this.goods.length; j++){
                        if(this.orders[i].article_good === this.goods[j].article){
                            if(this.orders[i].status[this.orders[i].status.length-1].status_now === 'received'){
                                profit += (this.orders[i].count * this.orders[i].costs) - (this.orders[i].count * this.goods[j].price)
                                this.newReport.push(this.orders[i])
                            }else{
                                possible +=(this.orders[i].count * this.orders[i].costs) - (this.orders[i].count * this.goods[j].price)
                            }
                
                        }
                    }
                }
            }
            
            const formDate = {
                report_date: data,
                income : profit,
                possible: possible,
                allOrders: this.newReport
            }

            await this.$store.dispatch('updateReports', formDate)
       }
    }
}
</script>