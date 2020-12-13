<template>
    <div class="detail-block" :class="[order.statusColor]" >
        <p>Дата : {{order.order_date}}</p>
        <p>Cумма : {{order.costs}}</p>
        <p>Артикул товара : {{order.article_good}}</p>
        <p>Количество : {{order.count}}</p>
        <p>ФИО : {{order.bio}}</p>
        <p>Телефон : {{order.phone}}</p>
        <p>Адресс : {{order.adress}}</p>
        <p>Доставка : {{order.delivery}}</p>
        <p>Коментарий : {{order.comment}}</p>
    </div>
</template>
<script>
export default {
    props:{
        order:{
            required:true
        }
    },
    data:()=>({
        color:''
    })
}
</script>