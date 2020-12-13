<template>
    <form class="detail-form" @submit.prevent="updateStatusOrder">
            <div class="input-field col s12">
            <select ref="select" v-model="status_now">
                <option value="" disabled selected>Статус</option>
                <option value="placed_order">Оформлен заказ</option>
                <option value="order_processed">Обработан заказ</option>
                <option value="submitted">Отправлен</option>
                <option value="delivery">Доставка</option>
                <option value="received">Получен</option>
                <option value="refund">Возврат</option>		           
                <option value="cancled">Отменён</option>		           
            </select>
            <label>Статус Заказа</label>
            </div>
            <div class="input-field  detail-input">
                <input id="last_name" type="text" class="validate" v-model="comment">
                <label for="last_name">Коментарий</label>
            </div>
            <button class="waves-effect waves-light btn" type="submit">Обновить<i class="material-icons right">refresh</i></button>
    </form>
</template>
<script>
export default {
        data:()=>({
           select : null,
           status_now:'',
           comment:''
        }),
        mounted(){
            this.select = M.FormSelect.init(this.$refs.select)
            M.updateTextFields()
        },
        methods:{
           async updateStatusOrder(){
               const id = this.$route.params.id
               const formData={
                    status_now: this.status_now,
                    comnt: this.comment,
                    changes_date: new Date().toLocaleString(),
                    id: id
                }
                 await this.$store.dispatch('setOrderStatus',formData)
                 this.$emit('updateStatus')
                 this.comment=''
                 this.status_now=''
            }
        }
}
</script>