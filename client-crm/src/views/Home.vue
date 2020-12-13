<template>
    <div class="app-page-container">
        <div class="page-title">
            <h2>Главная</h2>
            <hr>
        </div>
        <section class="app-table">
            <div class="graph">
                <canvas ref="canvas"></canvas>
            </div>
        </section>
    </div>
</template>
<script>

import { Bar } from 'vue-chartjs'
export default {
    name: 'Home',
    extends: Bar,
    data:()=>({
      reports:[],
      orders:[],
      goods:[],
      newReport:[],
      userInfo:[],
    }),

    mounted(){
        this.renderHome()
    },
    methods:{
       async renderHome(){
           this.orders = await this.$store.dispatch('fetchOrders')
           this.goods = await this.$store.dispatch('fetchGoods')
           this.userInfo = this.$store.getters.info.lastReport

           if(this.userInfo.slice(0,7) != new Date().toISOString().slice(0,7)){
              this.createNewReport()
           }else{
               this.updateReport()
           }
           
           this.reports = await this.$store.dispatch('fetchReports')

           this.renderChart({
               labels: this.reports.map(r => r.report_date.slice(0,7)),
               datasets:[
                    {
                            label : 'Доходы за месяц',
                            data: this.reports.map( r =>{
                                return r.income
                            }),
                            backgroundColor: [
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',

                            ],
                            borderColor: [
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                            ],
                            borderWidth: 1
                    },
                    {
                            label : 'Возможный доход',
                            data: this.reports.map( r =>{
                                return r.possible
                            }),
                            backgroundColor: [
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                            ],
                            borderColor: [
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                            ],
                            borderWidth: 1
                    }
                ]
           })


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