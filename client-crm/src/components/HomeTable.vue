<template>
    <div class="home-block">
        <div class="home-block__collections">            
             <div class="collection">
                <div class="collection-item">
                    <span class="main">Заказы в этом месяце</span>
                    <span class="new-badge orange">новые : {{tableItem.filter(order => order.status[order.status.length-1].status_now !== 'received' ).length}}</span>
                    <span class="new-badge green">успешные : {{tableItem.filter(order => order.status[order.status.length-1].status_now === 'received' ).length}}</span>
                    <span class="new-badge blue">возврат : {{tableItem.filter(order => order.status[order.status.length-1].status_now === 'cancled' ).length}}</span>
                    <span class="new-badge red">отмененные : {{tableItem.filter(order => order.status[order.status.length-1].status_now === 'refund' ).length}}</span>
                </div>
            </div>
        </div>
        <div class="home-block__table">
            <p>Последние 5 заказов :</p>
            <div v-if="!tableItem.length">
                <p>Заказов пока нет</p>
            </div>
            <table v-else>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Дата заказа</th>
                        <th>Ссылка</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(order, idx) in tableItem.slice(0,5).reverse()" :key="order.id">
                        <td>{{idx+1}}</td>
                        <td>{{order.order_date | date('date')}}</td>
                        <td><router-link :to="/orders-detail/+order.order_id"  class="waves-effect waves-light btn"><i class="material-icons">more_vert</i></router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="home-block__link">Посмотрите так же <router-link to="/orders">остальные заказы</router-link></p>
    </div>
</template>
<script>
export default {
    name:'home-table',
    props:{
        tableItem:{
            type:Array,
            required: true
        }
    }
    
}
</script>