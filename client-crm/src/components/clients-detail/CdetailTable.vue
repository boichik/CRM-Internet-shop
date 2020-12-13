<template>
    <table class="detail-table">
        <thead>
            <tr>
                <th>ID Заказа</th>
                <th>Адресс</th>
                <th>ФИО</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="order of orders" :key="order.id">
                <th>{{order.order_id}}</th>
                <th>{{order.address}}</th>
                <th>{{order.order_bio}}</th>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props:{
        orders:{
            required:true
        }
    }
}
</script>