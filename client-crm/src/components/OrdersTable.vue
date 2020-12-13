<template>
    <table class="order-table">
        <thead>
            <tr>
                <th class="th-sort" @click="sortNumber">Номер заказа<i class="material-icons icon-table">{{Inumber}}</i></th>
                <th class="th-sort" @click="sortCosts">Сумма<i class="material-icons icon-table">{{Icosts}}</i></th>
                <th @click="sortDate">Дата<i class="material-icons icon-table">{{Idate}}</i></th>
                <th class="th-sort" @click="sortArticle">Артикул товара<i class="material-icons icon-table">{{Iarticle}}</i></th>
                <th class="th-sort" @click="sortCount">Количество<i class="material-icons icon-table">{{Icount}}</i></th>
                <th>Статус</th>
                <th>Детали</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="order of orders" :key="order.id">
            <td>{{order.order_id}}</td>
            <td>{{order.costs}}</td>
            <td>{{order.order_date | date('date')}}</td>
            <td>{{order.article_good}}</td>
            <td>{{order.count}}</td>
            <td><div class="table-status" :class="[order.statusColor]">{{order.statusText | order('text')}}</div></td>
            <td><router-link :to="/orders-detail/+order.order_id"  class="waves-effect waves-light btn"><i class="material-icons">more_vert</i></router-link></td>
            </tr>
        </tbody>
	</table>
</template>
<script>
import { type } from 'os'
export default {
    props:{
        orders:{
            type: Array
        }
    },
    data(){
        return{
            Inumber:'',
            Icosts:'',
            Idate:'',
            Iarticle:'',
            Icount:''
        }
    },
    methods:{
       sortNumber(){
           if(this.Inumber==''){
             this.orders.sort((a,b) => a.order_id - b.order_id)
              this.Inumber='arrow_drop_down'
           }else{
               if(this.Inumber=='arrow_drop_down'){
                   this.orders.sort((a,b) => b.order_id - a.order_id)    
                    this.Inumber='arrow_drop_up'            
               }
               else{
                    if(this.Inumber=='arrow_drop_up'){
                    this.Inumber=''
                }
               }
            }
        },
        sortCosts(){
           if(this.Icosts==''){
             this.orders.sort((a,b) => a.costs - b.costs)
              this.Icosts='arrow_drop_down'
           }else{
               if(this.Icosts=='arrow_drop_down'){
                   this.orders.sort((a,b) => b.costs - a.costs)    
                    this.Icosts='arrow_drop_up'            
               }
               else{
                    if(this.Icosts=='arrow_drop_up'){
                    this.Icosts=''
                }
               }
            }
        },
        sortDate(){
           if(this.Idate==''){
             this.orders.sort((a,b) => a.order_date - b.order_date)
              this.Idate='arrow_drop_down'
           }else{
               if(this.Idate=='arrow_drop_down'){
                   this.orders.sort((a,b) => b.order_date - a.order_date)    
                    this.Idate='arrow_drop_up'            
               }
               else{
                    if(this.Idate=='arrow_drop_up'){
                    this.Idate=''
                }
               }
            }
        },
        sortArticle(){
           if(this.Iarticle==''){
             this.orders.sort((a,b) => a.article_good - b.article_good)
              this.Iarticle='arrow_drop_down'
           }else{
               if(this.Iarticle=='arrow_drop_down'){
                   this.orders.sort((a,b) => b.article_good - a.article_good)    
                    this.Iarticle='arrow_drop_up'            
               }
               else{
                    if(this.Iarticle=='arrow_drop_up'){
                    this.Iarticle=''
                }
               }
            }
        },
        sortCount(){
           if(this.Icount==''){
             this.orders.sort((a,b) => a.count - b.count)
              this.Icount='arrow_drop_down'
           }else{
               if(this.Icount=='arrow_drop_down'){
                   this.orders.sort((a,b) => b.count - a.count)    
                    this.Icount='arrow_drop_up'            
               }
               else{
                    if(this.Icount=='arrow_drop_up'){
                    this.Icount=''
                }
               }
            }
        },
    }
}
</script>