<template>
    <table class="good-table">
        <thead>
            <tr>
                <th class="th-sort" @click="sortNumber">Номер товара<i class="material-icons icon-table">{{Inumber}}</i></th>
                <th class="th-sort" @click="sortName">Название<i class="material-icons icon-table">{{Iname}}</i></th>
                <th class="th-sort" @click="sortPrice">Цена<i class="material-icons icon-table">{{Iprice}}</i></th>
                <th class="th-sort" @click="sortArticle">Артикул<i class="material-icons icon-table">{{Iarticle}}</i></th>
                <th class="th-sort" @click="sortCount">Количество<i class="material-icons icon-table">{{Icount}}</i></th>
                <th class="th-sort" @click="sortManuf">Производитель<i class="material-icons icon-table">{{Imanuf}}</i></th>
                <th>Детали</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="good of goods" :key="good.id">
            <td>{{good.good_id}}</td>
            <td>{{good.name}}</td>
            <td>{{good.price}}</td>
            <td>{{good.article}}</td>
            <td>{{good.count}}</td>
            <td>{{good.manufacturer}}</td>
            <td><router-link :to="/goods-detail/+good.good_id" class="waves-effect waves-light btn"><i class="material-icons">more_vert</i></router-link></td>
            </tr>
        </tbody>
	</table>
</template>
<script>
import { type } from 'os'
export default {
    props:{
        goods:{
            type: Array
        }
    },
    data(){
        return{
            Inumber:'',
            Iname:'',
            Iprice:'',
            Imanuf:'',
            Iarticle:'',
            Icount:''
        }
    },
    methods:{
       sortNumber(){
           if(this.Inumber==''){
             this.goods.sort((a,b) => a.good_id - b.good_id)
              this.Inumber='arrow_drop_down'
           }else{
               if(this.Inumber=='arrow_drop_down'){
                   this.goods.sort((a,b) => b.good_id - a.good_id)    
                    this.Inumber='arrow_drop_up'            
               }
               else{
                    if(this.Inumber=='arrow_drop_up'){
                    this.Inumber=''
                }
               }
            }
        },
        sortName(){
            if(this.Iname==''){
                this.goods.sort((a,b) => a.name.localeCompare(b.name))
                this.Iname='arrow_drop_down'
            }else{
                    if(this.Iname=='arrow_drop_down'){
                        this.goods.sort((a,b) => b.name.localeCompare(a.name))    
                            this.Iname='arrow_drop_up'            
                    }
                    else{
                            if(this.Iname=='arrow_drop_up'){
                            this.Iname=''
                        }
                    }
                }
        },
        sortManuf(){
            if(this.Imanuf==''){
                this.goods.sort((a,b) => a.manufacturer.localeCompare(b.manufacturer))
                this.Imanuf='arrow_drop_down'
            }else{
                    if(this.Imanuf=='arrow_drop_down'){
                        this.goods.sort((a,b) => b.manufacturer.localeCompare(a.manufacturer))    
                            this.Imanuf='arrow_drop_up'            
                    }
                    else{
                            if(this.Imanuf=='arrow_drop_up'){
                            this.Imanuf=''
                        }
                    }
                }
        },
        sortArticle(){
           if(this.Iarticle==''){
             this.goods.sort((a,b) => a.article - b.article)
              this.Iarticle='arrow_drop_down'
           }else{
               if(this.Iarticle=='arrow_drop_down'){
                   this.goods.sort((a,b) => b.article - a.article)    
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
             this.goods.sort((a,b) => a.count - b.count)
              this.Icount='arrow_drop_down'
           }else{
               if(this.Icount=='arrow_drop_down'){
                   this.goods.sort((a,b) => b.count - a.count)    
                    this.Icount='arrow_drop_up'            
               }
               else{
                    if(this.Icount=='arrow_drop_up'){
                    this.Icount=''
                }
               }
            }
        },
        sortPrice(){
           if(this.Iprice==''){
             this.goods.sort((a,b) => a.price - b.price)
              this.Iprice='arrow_drop_down'
           }else{
               if(this.Iprice=='arrow_drop_down'){
                   this.goods.sort((a,b) => b.price - a.price)    
                    this.Iprice='arrow_drop_up'            
               }
               else{
                    if(this.Iprice=='arrow_drop_up'){
                    this.Iprice=''
                }
               }
            }
        },
    }
}
</script>