<template>
    <table class="detail-table">
        <thead>
            <tr>
                <th>Дата</th>
                <th>Статус</th>
                <th>Коментарий</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="ord of status" :key="ord.id">
                <th>{{ord.changes_date | date('date')}}</th>
                <th>{{ord.status_now | order('text')}}
                </th>
                <th>{{ord.comnt}}</th>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props:{
        status:{
            required:true
        }
    }
}
</script>